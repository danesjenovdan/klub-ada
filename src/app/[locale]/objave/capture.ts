import {
  createContext,
  destroyContext,
  domToCanvas,
  domToForeignObjectSvg,
  type Options,
} from "modern-screenshot";

/*
 * Turning a post into files. A post is ordinary DOM, so each frame is drawn
 * with modern-screenshot (DOM → SVG foreignObject → canvas) and a video is
 * those canvases encoded to H.264 MP4 in the browser with WebCodecs, through
 * mediabunny. Nothing leaves the machine.
 */

const toDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

/**
 * Captures one element over and over, e.g. every frame of an animation.
 *
 * Each frame gets a fresh modern-screenshot context (a reused one keeps
 * appending its CSS, so frames would get slower and slower), but images and
 * the embedded fonts are fetched once and shared across all of them.
 */
export class FrameCapturer {
  private images = new Map<string, Promise<string | false>>();
  private fontCss: string | undefined;

  constructor(
    private node: HTMLElement,
    private scale: number,
  ) {}

  private fetchImage = (url: string) => {
    if (url.startsWith("data:")) return Promise.resolve(false as const);
    let request = this.images.get(url);
    if (!request) {
      request = fetch(url, { mode: "cors" })
        .then((response) => (response.ok ? response.blob() : Promise.reject()))
        .then(toDataUrl)
        .catch(() => false as const);
      this.images.set(url, request);
    }
    return request;
  };

  /**
   * The element as an SVG file: its HTML wrapped in a foreignObject, with the
   * fonts and images embedded so the file stands on its own. Text and shapes
   * stay vector; canvases (the planets, the swirl, treated photos) go in as
   * images. Browsers render it exactly; design tools such as Figma or
   * Illustrator don't read foreignObject, so it is not an editable vector file.
   */
  async svg(): Promise<Blob> {
    const context = await createContext(this.node, {
      fetchFn: this.fetchImage,
      font: this.fontCss === undefined ? undefined : { cssText: this.fontCss },
      timeout: 30000,
      autoDestruct: false,
    });
    try {
      const svg = await domToForeignObjectSvg(context);
      if (this.scale !== 1) {
        // Export at the format's size, e.g. 1200×1200 for LinkedIn.
        svg.setAttribute(
          "width",
          String(Math.round(this.node.offsetWidth * this.scale)),
        );
        svg.setAttribute(
          "height",
          String(Math.round(this.node.offsetHeight * this.scale)),
        );
      }
      const markup = new XMLSerializer().serializeToString(svg);
      return new Blob([markup], { type: "image/svg+xml" });
    } finally {
      destroyContext(context);
    }
  }

  async capture(): Promise<HTMLCanvasElement> {
    const options: Options & { autoDestruct: boolean } = {
      scale: this.scale,
      fetchFn: this.fetchImage,
      font: this.fontCss === undefined ? undefined : { cssText: this.fontCss },
      timeout: 30000,
      autoDestruct: false,
    };
    const context = await createContext(this.node, options);
    try {
      const canvas = await domToCanvas(context);
      if (this.fontCss === undefined) {
        // Keep the fonts this capture embedded, for every frame after it.
        this.fontCss = Array.from(context.fontCssTexts.values()).join("\n");
      }
      return canvas;
    } finally {
      destroyContext(context);
    }
  }
}

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 10000);
};

export const canvasToPng = (canvas: HTMLCanvasElement) =>
  new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Empty canvas"))),
      "image/png",
    ),
  );

/** Whether this browser can encode H.264 video at this size at all. */
export async function canEncodeMp4(width: number, height: number) {
  if (typeof VideoEncoder === "undefined") return false;
  const { canEncodeVideo } = await import("mediabunny");
  return canEncodeVideo("avc", { width, height });
}

/**
 * Encodes `frameCount` frames into an MP4. `drawFrame(index)` must return the
 * finished canvas for that frame; it is awaited one frame at a time, so the
 * page can re-render the post between frames.
 */
export async function encodeMp4({
  width,
  height,
  fps,
  frameCount,
  drawFrame,
  onProgress,
}: {
  width: number;
  height: number;
  fps: number;
  frameCount: number;
  drawFrame: (index: number) => Promise<HTMLCanvasElement>;
  onProgress?: (progress: number) => void;
}) {
  const {
    BufferTarget,
    CanvasSource,
    Mp4OutputFormat,
    Output,
    QUALITY_VERY_HIGH,
  } = await import("mediabunny");

  // A canvas of exactly the output size, so a capture rounded a pixel either
  // way still encodes.
  const target = document.createElement("canvas");
  target.width = width;
  target.height = height;
  const ctx = target.getContext("2d")!;

  const output = new Output({
    format: new Mp4OutputFormat({ fastStart: "in-memory" }),
    target: new BufferTarget(),
  });
  const source = new CanvasSource(target, {
    codec: "avc",
    bitrate: QUALITY_VERY_HIGH,
    keyFrameInterval: 2,
  });
  output.addVideoTrack(source, { frameRate: fps });
  await output.start();

  for (let index = 0; index < frameCount; index++) {
    const frame = await drawFrame(index);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(frame, 0, 0, width, height);
    await source.add(index / fps, 1 / fps);
    onProgress?.((index + 1) / frameCount);
  }

  await output.finalize();
  return new Blob([output.target.buffer!], { type: "video/mp4" });
}
