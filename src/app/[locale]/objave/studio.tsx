"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { anaheim, instrumentSerif, plexMono } from "@/src/app/fonts";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import {
  FrameCapturer,
  canEncodeMp4,
  canvasToPng,
  downloadBlob,
  encodeGif,
  encodeMp4,
} from "./capture";
import {
  GET_POSTS_CONTENT,
  PostsContent,
  WorkshopPost,
  RewardPost,
  JudgePost,
} from "./data";
import { FORMATS, FPS, Format } from "./formats";
import {
  DateContext,
  LogoContext,
  LogoMode,
  RippleContext,
  rasteriseRipple,
} from "./frame";
import {
  CATEGORIES,
  Category,
  PostDef,
  Variants,
  buildPosts,
  fileName,
} from "./posts";
import { SPONSOR_VARIANTS } from "./posts/sponsor";
import { GALLERY_VARIANTS } from "./posts/gallery";
import { REGISTRATION_VARIANTS } from "./posts/registration";
import { photosReady } from "./posts/screen-photo";
import { WorkshopEditor } from "./workshop-editor";
import { AwardEditor } from "./award-editor";
import { JudgeEditor } from "./judge-editor";
import { Segmented, Toolbar, caption, control } from "./toolbar";

/** A question mark drawn in pixels, for the help button. */
function PixelQuestion() {
  const rows = [
    ".#####.",
    "##...##",
    "##...##",
    "....##.",
    "...##..",
    "...##..",
    ".......",
    "...##..",
    "...##..",
  ];
  return (
    <svg
      width={7 * 3}
      height={rows.length * 3}
      viewBox={`0 0 7 ${rows.length}`}
      shapeRendering="crispEdges"
      aria-hidden
      className="fill-[#ff5757] group-open:fill-black"
    >
      {rows.flatMap((row, y) =>
        Array.from(row).map((cell, x) =>
          cell === "#" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />
          ) : null,
        ),
      )}
    </svg>
  );
}

/** Wait for React to commit and the browser to lay the frame out. */
const nextFrame = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );

/** A post scaled down to `width`, at playhead `t`. */
function Preview({
  post,
  format,
  t,
  width,
}: {
  post: PostDef;
  format: Format;
  t: number;
  width: number;
}) {
  const scale = width / format.width;
  return (
    <div
      className="relative overflow-hidden"
      style={{ width, height: format.height * scale }}
    >
      <div
        className="absolute left-0 top-0"
        style={{ transform: `scale(${scale})`, transformOrigin: "0 0" }}
      >
        {post.render(t, format)}
      </div>
    </div>
  );
}

/** Width of an element, kept current as it resizes. */
function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.floor(entry.contentRect.width)),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

type Job = {
  postId: string;
  kind: "png" | "video" | "gif" | "zip";
  progress: number;
};

/** A GIF is drawn smaller and choppier than the MP4, or it gets huge. */
const GIF_WIDTH = 540;
const GIF_FPS = 20;

function PostCard({
  post,
  format,
  job,
  busy,
  onPng,
  onSvg,
  onVideo,
  onGif,
  children,
}: {
  post: PostDef;
  format: Format;
  job: Job | null;
  busy: boolean;
  onPng: () => void;
  onSvg: () => void;
  onVideo: () => void;
  onGif: () => void;
  /** Extra controls under the card, e.g. the workshop editor. */
  children?: React.ReactNode;
}) {
  const t = useTranslations("Posts");
  const [ref, width] = useWidth();
  const [playhead, setPlayhead] = useState(post.still);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play in real time from where the playhead is, looping with a beat of rest
  // at the end so the last frame registers.
  useEffect(() => {
    if (!isPlaying) return;
    let frame: number;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      setPlayhead((current) => {
        const next = current + delta;
        return next > post.duration + 0.6 ? 0 : next;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isPlaying, post.duration]);

  const percent = job ? Math.round(job.progress * 100) : 0;

  return (
    <article className="flex flex-col gap-3">
      <div
        ref={ref}
        className="relative cursor-pointer border border-[rgba(255,87,87,0.3)] bg-black shadow-[6px_6px_0_rgba(0,0,0,0.6)] transition-colors hover:border-[#ff5757]"
        // Hovering plays the post with a mouse only: a tap on a touch screen
        // fires an emulated hover before its click, which would start the
        // post and stop it again straight away. A tap plays and pauses.
        onPointerEnter={(event) => {
          if (event.pointerType !== "mouse") return;
          setPlayhead(0);
          setIsPlaying(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== "mouse") return;
          setIsPlaying(false);
          setPlayhead(post.still);
        }}
        onClick={() => setIsPlaying((playing) => !playing)}
      >
        {width > 0 && (
          <Preview
            post={post}
            format={format}
            t={Math.min(playhead, post.duration)}
            width={width}
          />
        )}
        {/* On a touch screen there is no hover to hint that a post plays. */}
        {!isPlaying && !job && (
          <span
            aria-hidden
            className={clsx(
              plexMono.className,
              "pointer-events-none absolute bottom-2 right-2 bg-[rgba(12,3,3,0.8)] px-2 py-1 text-xs uppercase tracking-[0.14em] text-[#fafafa] [@media(hover:hover)]:hidden",
            )}
          >
            ▶ {t("play")}
          </span>
        )}
        {job && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[rgba(12,3,3,0.8)]">
            <p
              className={clsx(
                plexMono.className,
                "text-xs uppercase tracking-[0.12em]",
              )}
            >
              {t("exporting", { percent })}
            </p>
            <div className="flex h-4 w-2/3 gap-[2px] border-2 border-t-[#262626] border-l-[#262626] border-r-[#e6e6e6] border-b-[#e6e6e6] p-[2px]">
              <div className="h-full bg-red" style={{ width: `${percent}%` }} />
            </div>
          </div>
        )}
      </div>

      <input
        type="range"
        min={0}
        max={post.duration}
        step={1 / FPS}
        value={Math.min(playhead, post.duration)}
        onChange={(event) => {
          setIsPlaying(false);
          setPlayhead(Number(event.target.value));
        }}
        aria-label={post.label}
        className="h-6 w-full accent-[#ff5757]"
      />

      <div className="flex flex-col gap-3">
        <div className="min-w-0">
          <p
            className={clsx(
              plexMono.className,
              "text-xs uppercase tracking-[0.14em] text-[#ff5757]",
            )}
          >
            {t(`categories.${post.category}`)}
          </p>
          <p className="truncate text-lg font-bold leading-tight">
            {post.label}
          </p>
          <p className={clsx(plexMono.className, "text-xs text-gray400")}>
            {`${Math.min(playhead, post.duration).toFixed(1)} / ${post.duration.toFixed(1)} s`}
          </p>
        </div>
        {/* Downloads: two stills, then the animation as MP4 or GIF. */}
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={onPng}
            className={clsx(control, "hover:bg-[#ff5757] hover:text-black")}
          >
            ↓ {t("png")}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={onSvg}
            className={clsx(control, "hover:bg-[#ff5757] hover:text-black")}
          >
            ↓ {t("svg")}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={onVideo}
            className={clsx(
              control,
              "bg-[#ff5757] text-black hover:bg-[#ff7a7a]",
            )}
          >
            ↓ {t("mp4")}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={onGif}
            className={clsx(
              control,
              "bg-[#ff5757] text-black hover:bg-[#ff7a7a]",
            )}
          >
            ↓ {t("gif")}
          </button>
        </div>
      </div>
      {children}
    </article>
  );
}

export function Studio() {
  const t = useTranslations("Posts");
  const locale = useLocale();
  const { data, isLoading } = useSanityData({
    query: GET_POSTS_CONTENT,
    params: { language: locale },
  });

  const [formatId, setFormatId] = useState<Format["id"]>("instagram");
  const format = FORMATS.find((f) => f.id === formatId)!;
  const [category, setCategory] = useState<Category | "all">("all");
  const [logoMode, setLogoMode] = useState<LogoMode>("full");
  const [showDate, setShowDate] = useState(false);
  const [variants, setVariants] = useState<Variants>({
    sponsors: "sky",
    registration: "phone",
    pictures: "finder",
  });
  const [ripple, setRipple] = useState<string>();
  const [job, setJob] = useState<Job | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // The frame being exported, rendered full size off screen.
  const [stage, setStage] = useState<{ post: PostDef; t: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rasteriseRipple().then(setRipple);
  }, []);

  const exampleWorkshop: WorkshopPost = useMemo(
    () => ({
      _id: "example-workshop",
      title: t("workshop.example_title"),
      speaker: t("workshop.example_speaker"),
      speakerRole: t("workshop.example_role"),
      description: t("workshop.example_description"),
      photoUrl: "/assets/hackathon26/social/workshop-example.jpg",
      time: "2026-11-21T13:00:00.000Z",
      endTime: "2026-11-21T14:00:00.000Z",
      isExample: true,
    }),
    [t],
  );

  const content = data as PostsContent | null;
  // Changes made on the page to each workshop post, over what Sanity has.
  const [judgeEdits, setJudgeEdits] = useState<
    Record<string, Partial<JudgePost>>
  >({});
  const exampleJudge: JudgePost = useMemo(
    () => ({
      _id: "example-judge",
      name: t("workshop.example_speaker"),
      role: t("workshop.example_role"),
      photoUrl: "/assets/hackathon26/social/workshop-example.jpg",
      isExample: true,
    }),
    [t],
  );
  const [rewardEdits, setRewardEdits] = useState<
    Record<string, Partial<RewardPost>>
  >({});
  const [workshopEdits, setWorkshopEdits] = useState<
    Record<string, Partial<WorkshopPost>>
  >({});
  const workshopFor = (id: string) => {
    const base =
      content?.workshops.find((w) => w._id === id) ??
      (id === exampleWorkshop._id ? exampleWorkshop : undefined);
    return base && { ...base, ...workshopEdits[id] };
  };
  const posts = useMemo(
    () =>
      content
        ? buildPosts(
            content,
            exampleWorkshop,
            variants,
            workshopEdits,
            rewardEdits,
            exampleJudge,
            judgeEdits,
          )
        : [],
    [
      content,
      exampleWorkshop,
      variants,
      workshopEdits,
      rewardEdits,
      exampleJudge,
      judgeEdits,
    ],
  );
  const shown = posts.filter(
    (post) => category === "all" || post.category === category,
  );

  /** Mount `post` off screen at `t` and wait until it is on the page. */
  const showOnStage = async (post: PostDef, time: number) => {
    flushSync(() => setStage({ post, t: time }));
    await nextFrame();
    // Treated photos draw on a canvas once their image has loaded.
    await photosReady();
    return stageRef.current!.firstElementChild as HTMLElement;
  };

  const capturePng = async (post: PostDef, capturer?: FrameCapturer) => {
    const node = await showOnStage(post, post.still);
    const canvas = await (
      capturer ?? new FrameCapturer(node, format.exportScale)
    ).capture();
    return canvasToPng(canvas);
  };

  const run = async (task: () => Promise<void>) => {
    setMessage(null);
    try {
      await task();
    } catch (error) {
      console.error(error);
      setMessage(t("export_failed"));
    } finally {
      setJob(null);
      setStage(null);
    }
  };

  const exportPng = (post: PostDef) =>
    run(async () => {
      setJob({ postId: post.id, kind: "png", progress: 0.5 });
      downloadBlob(await capturePng(post), fileName(post, format, "png"));
    });

  const exportSvg = (post: PostDef) =>
    run(async () => {
      setJob({ postId: post.id, kind: "png", progress: 0.5 });
      const node = await showOnStage(post, post.still);
      const blob = await new FrameCapturer(node, format.exportScale).svg();
      downloadBlob(blob, fileName(post, format, "svg"));
    });

  const exportVideo = (post: PostDef) =>
    run(async () => {
      const width = Math.round(format.width * format.exportScale);
      const height = Math.round(format.height * format.exportScale);
      if (!(await canEncodeMp4(width, height))) {
        setMessage(t("no_video"));
        return;
      }
      setJob({ postId: post.id, kind: "video", progress: 0 });
      // Capture the still first: it has every element on screen, so it
      // collects every font the clip will need.
      const node = await showOnStage(post, post.still);
      const capturer = new FrameCapturer(node, format.exportScale);
      await capturer.capture();

      const blob = await encodeMp4({
        width,
        height,
        fps: FPS,
        frameCount: Math.round(post.duration * FPS),
        drawFrame: async (index) => {
          await showOnStage(post, index / FPS);
          return capturer.capture();
        },
        onProgress: (progress) =>
          setJob({ postId: post.id, kind: "video", progress }),
      });
      downloadBlob(blob, fileName(post, format, "mp4"));
    });

  const exportGif = (post: PostDef) =>
    run(async () => {
      setJob({ postId: post.id, kind: "gif", progress: 0 });
      // Captured straight at the GIF's size, which is also much quicker.
      const scale = GIF_WIDTH / format.width;
      const width = GIF_WIDTH;
      const height = Math.round(format.height * scale);
      // The still first, to collect every font, as for the MP4.
      const node = await showOnStage(post, post.still);
      const capturer = new FrameCapturer(node, scale);
      await capturer.capture();

      const blob = await encodeGif({
        width,
        height,
        fps: GIF_FPS,
        frameCount: Math.round(post.duration * GIF_FPS),
        drawFrame: async (index) => {
          await showOnStage(post, index / GIF_FPS);
          return capturer.capture();
        },
        onProgress: (progress) =>
          setJob({ postId: post.id, kind: "gif", progress }),
      });
      downloadBlob(blob, fileName(post, format, "gif"));
    });

  const exportAllPngs = () =>
    run(async () => {
      const { zipSync } = await import("fflate");
      const files: Record<string, Uint8Array> = {};
      for (const [index, post] of shown.entries()) {
        setJob({
          postId: post.id,
          kind: "zip",
          progress: index / shown.length,
        });
        const blob = await capturePng(post);
        files[fileName(post, format, "png")] = new Uint8Array(
          await blob.arrayBuffer(),
        );
      }
      const zip = zipSync(files, { level: 0 });
      downloadBlob(
        new Blob([zip], { type: "application/zip" }),
        `adahack-objave-${category}-${format.id}.zip`,
      );
    });

  const counts = useMemo(
    () =>
      Object.fromEntries(
        CATEGORIES.map((c) => [
          c,
          posts.filter((p) => p.category === c).length,
        ]),
      ) as Record<Category, number>,
    [posts],
  );

  return (
    <RippleContext.Provider
      value={ripple ?? "/assets/hackathon26/social/ripple.svg"}
    >
      <LogoContext.Provider value={logoMode}>
        <DateContext.Provider value={showDate}>
          <main
            className={clsx(
              anaheim.className,
              "min-h-screen bg-[#0c0303] px-4 py-6 text-[#fafafa] md:px-10 md:py-10",
            )}
          >
            <header className="mb-6 flex items-center justify-between gap-4 md:mb-10 md:items-start md:gap-6">
              <div className="flex min-w-0 items-center gap-3 md:gap-4">
                <img
                  src="/assets/hackathon26/social/duck.svg"
                  alt=""
                  className="h-8 w-auto shrink-0 [image-rendering:pixelated] md:h-12"
                />
                <h1
                  className={clsx(
                    instrumentSerif.className,
                    "text-[28px] leading-none sm:text-4xl md:text-6xl",
                  )}
                >
                  {t("heading")}
                </h1>
              </div>
              {/* How it works, folded away behind a pixel question mark. */}
              <details className="group relative z-40 shrink-0">
                <summary
                  aria-label={t("help")}
                  title={t("help")}
                  className="flex h-10 w-10 cursor-pointer list-none md:h-12 md:w-12 items-center justify-center border border-[rgba(255,87,87,0.5)] transition-colors hover:bg-[rgba(255,87,87,0.15)] group-open:bg-[#ff5757] [&::-webkit-details-marker]:hidden"
                >
                  <PixelQuestion />
                </summary>
                <ol className="absolute right-0 top-[calc(100%+8px)] z-40 flex w-[min(26rem,calc(100vw-2rem))] flex-col gap-3 border border-[rgba(255,87,87,0.5)] bg-[#0c0303] p-4 shadow-[8px_8px_0_rgba(0,0,0,0.6)]">
                  {[0, 1, 2].map((index) => (
                    <li key={index} className="flex gap-4">
                      <span
                        className={clsx(
                          plexMono.className,
                          "flex h-8 w-8 shrink-0 items-center justify-center bg-[#ff5757] text-sm font-semibold text-black",
                        )}
                      >
                        {index + 1}
                      </span>
                      <span className="flex flex-col gap-1">
                        <span className="text-lg font-bold leading-tight">
                          {t(`steps.${index}.title`)}
                        </span>
                        <span className="text-sm leading-snug text-[#bdbdbd]">
                          {t(`steps.${index}.text`)}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </details>
            </header>

            {/* The settings and filter stay in reach while scrolling. */}
            <Toolbar
              format={format}
              onFormat={setFormatId}
              logoMode={logoMode}
              onLogoMode={setLogoMode}
              showDate={showDate}
              onShowDate={setShowDate}
              category={category}
              onCategory={setCategory}
              counts={counts}
              total={posts.length}
              isBusy={!!job}
              onDownloadAll={exportAllPngs}
              zipProgress={job?.kind === "zip" ? job.progress : null}
            />

            {message && (
              <p
                className={clsx(
                  plexMono.className,
                  "mb-6 border border-[#fbb040] px-4 py-3 text-sm text-[#fbb040]",
                )}
              >
                {message}
              </p>
            )}

            {isLoading ? (
              <p
                className={clsx(
                  plexMono.className,
                  "text-sm uppercase tracking-[0.12em]",
                )}
              >
                {t("loading")}
              </p>
            ) : (
              <div className="flex flex-col gap-12 md:gap-16">
                {CATEGORIES.filter(
                  (c) => category === "all" || category === c,
                ).map((c) => {
                  const sectionPosts = shown.filter(
                    (post) => post.category === c,
                  );
                  if (!sectionPosts.length) return null;
                  const options =
                    c === "registration"
                      ? { label: t("layout"), list: REGISTRATION_VARIANTS }
                      : c === "sponsors"
                        ? { label: t("layout"), list: SPONSOR_VARIANTS }
                        : c === "pictures"
                          ? { label: t("layout"), list: GALLERY_VARIANTS }
                          : null;
                  const key = c as keyof Variants;
                  return (
                    <section key={c} className="flex flex-col gap-5 md:gap-6">
                      <div className="flex flex-col gap-4 border-b border-[rgba(255,87,87,0.2)] pb-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex flex-col gap-1">
                          <h2
                            className={clsx(
                              instrumentSerif.className,
                              "text-3xl leading-none md:text-4xl",
                            )}
                          >
                            {t(`categories.${c}`)}{" "}
                            <span
                              className={clsx(
                                plexMono.className,
                                "align-middle text-sm text-gray400",
                              )}
                            >
                              {t("count", { count: sectionPosts.length })}
                            </span>
                          </h2>
                          {t.has(`sections.${c}`) && (
                            <p className="max-w-2xl text-base text-[#bdbdbd]">
                              {t(`sections.${c}`)}
                            </p>
                          )}
                        </div>
                        {options && (
                          // A phone puts the caption above and lets the
                          // options share the full width.
                          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
                            <span className={caption}>{options.label}</span>
                            <div className="w-full md:w-auto">
                              <Segmented
                                label={options.label}
                                options={options.list.map((option) => ({
                                  id: option.id,
                                  content: option.label,
                                }))}
                                value={variants[key]}
                                onChange={(id) =>
                                  setVariants((current) => ({
                                    ...current,
                                    [key]: id,
                                  }))
                                }
                                disabled={!!job}
                                isSmall
                                stretch
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div
                        className="grid gap-x-8 gap-y-12"
                        style={{
                          gridTemplateColumns: `repeat(auto-fill, minmax(min(${format.id === "story" ? 240 : 300}px, 100%), 1fr))`,
                        }}
                      >
                        {sectionPosts.map((post) => (
                          <PostCard
                            key={`${post.id}-${format.id}-${post.variant ?? ""}`}
                            post={post}
                            format={format}
                            job={
                              job &&
                              job.postId === post.id &&
                              job.kind !== "zip"
                                ? job
                                : null
                            }
                            busy={!!job}
                            onPng={() => exportPng(post)}
                            onSvg={() => exportSvg(post)}
                            onVideo={() => exportVideo(post)}
                            onGif={() => exportGif(post)}
                          >
                            {post.category === "jury" &&
                              (() => {
                                const base =
                                  content?.judges.find(
                                    (j) => j._id === post.id,
                                  ) ??
                                  (post.id === exampleJudge._id
                                    ? exampleJudge
                                    : undefined);
                                return (
                                  base && (
                                    <JudgeEditor
                                      value={{
                                        ...base,
                                        ...judgeEdits[post.id],
                                      }}
                                      onChange={(edit) =>
                                        setJudgeEdits((edits) => ({
                                          ...edits,
                                          [post.id]: {
                                            ...edits[post.id],
                                            ...edit,
                                          },
                                        }))
                                      }
                                      onReset={() =>
                                        setJudgeEdits(
                                          ({ [post.id]: _, ...rest }) => rest,
                                        )
                                      }
                                    />
                                  )
                                );
                              })()}
                            {post.category === "awards" &&
                              (() => {
                                const base = content?.rewards.find(
                                  (r) => r._id === post.id,
                                );
                                return (
                                  base && (
                                    <AwardEditor
                                      value={{
                                        ...base,
                                        ...rewardEdits[post.id],
                                      }}
                                      onChange={(edit) =>
                                        setRewardEdits((edits) => ({
                                          ...edits,
                                          [post.id]: {
                                            ...edits[post.id],
                                            ...edit,
                                          },
                                        }))
                                      }
                                      onReset={() =>
                                        setRewardEdits(
                                          ({ [post.id]: _, ...rest }) => rest,
                                        )
                                      }
                                    />
                                  )
                                );
                              })()}
                            {post.category === "workshops" &&
                              (() => {
                                const workshop = workshopFor(post.id);
                                return (
                                  workshop && (
                                    <WorkshopEditor
                                      value={workshop}
                                      onChange={(edit) =>
                                        setWorkshopEdits((edits) => ({
                                          ...edits,
                                          [post.id]: {
                                            ...edits[post.id],
                                            ...edit,
                                          },
                                        }))
                                      }
                                      onReset={() =>
                                        setWorkshopEdits(
                                          ({ [post.id]: _, ...rest }) => rest,
                                        )
                                      }
                                    />
                                  )
                                );
                              })()}
                          </PostCard>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}

            {/* Off screen, full size: what actually gets captured. */}
            <div
              ref={stageRef}
              aria-hidden
              className="pointer-events-none fixed left-0 top-0 -translate-x-[200vw]"
            >
              {stage && stage.post.render(stage.t, format)}
            </div>
          </main>
        </DateContext.Provider>
      </LogoContext.Provider>
    </RippleContext.Provider>
  );
}
