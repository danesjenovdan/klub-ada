"use client";

import { useEffect, useRef } from "react";

/*
 * The hackathon desktop's backdrop for posts: a deep red glow under a slow,
 * blurred swirl of reds poured round the centre, with a fine grain, after the
 * swirl shader on the site. It is our own small WebGL shader rather than the
 * site's WebGPU one, so that it runs on the post's clock (`t`) and keeps its
 * pixels for capture.
 */

const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform vec2 size;
uniform float time;

// The site backdrop's colours: the ground, two deep reds and the brand red.
const vec3 INK = vec3(0.047, 0.012, 0.012);
const vec3 DEEP = vec3(0.227, 0.043, 0.043);
const vec3 DARK = vec3(0.478, 0.122, 0.122);
const vec3 RED = vec3(1.0, 0.341, 0.341);

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    amplitude *= 0.5;
  }
  return value;
}

// The site's swirl stops: ground, deep red at 0.6, dark red at 0.85, red at 1.
vec3 swirlColour(float v) {
  vec3 c = mix(INK, DEEP, smoothstep(0.0, 0.6, v));
  c = mix(c, DARK, smoothstep(0.6, 0.85, v));
  // Only a touch of the brand red at the very crests, so the swirl reads as a
  // deep red glow rather than pink.
  return mix(c, RED, 0.35 * smoothstep(0.9, 1.0, v));
}

void main() {
  // Centred, with the short side running -1..1.
  vec2 uv = (gl_FragCoord.xy - 0.5 * size) / min(size.x, size.y);
  float r = length(uv);

  // Twirl: the nearer the middle, the further the field is turned, and the
  // whole twirl turns slowly over time, so the colour pours round the centre.
  float angle = 4.5 * (1.0 - smoothstep(0.0, 1.3, r)) + time * 0.45;
  float s = sin(angle);
  float c = cos(angle);
  vec2 p = mat2(c, -s, s, c) * uv;

  // Flowing colour: noise warped by itself, drifting gently.
  vec2 q = vec2(
    fbm(p * 1.4 + vec2(0.0, time * 0.18)),
    fbm(p * 1.4 + vec2(5.2, 1.3) - time * 0.15)
  );
  float v = fbm(p * 1.2 + q * 1.8 + time * 0.1);
  v = smoothstep(0.25, 0.85, v);

  // The site's base: a deep red glow fading to the ground at the edges, with
  // the swirl laid over it at about half strength.
  // Mostly black: the deep red stays near the middle, the swirl's light
  // only in its brighter streaks.
  vec3 base = mix(DEEP * 0.6, INK, smoothstep(0.0, 0.9, r));
  vec3 colour = mix(base, swirlColour(v), 0.38 * smoothstep(0.35, 0.8, v) * (1.0 - smoothstep(0.3, 1.2, r)));
  colour *= 1.0 - 0.6 * smoothstep(0.6, 1.4, r);
  // Fine grain, as on the Figma frames.
  colour += (hash(gl_FragCoord.xy) - 0.5) * 0.03;
  gl_FragColor = vec4(colour, 1.0);
}
`;

function compile(gl: WebGLRenderingContext) {
  const shader = (type: number, source: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, source);
    gl.compileShader(s);
    return s;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, shader(gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  return {
    size: gl.getUniformLocation(program, "size"),
    time: gl.getUniformLocation(program, "time"),
  };
}

/**
 * Draws the swirl at `t` seconds. Rendered at half resolution: it is all soft
 * gradients, and a smaller canvas keeps every captured frame light.
 */
export function Swirl({
  t,
  width,
  height,
}: {
  t: number;
  width: number;
  height: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<{
    gl: WebGLRenderingContext;
    uniforms: ReturnType<typeof compile>;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!glRef.current) {
      // Keep the drawing buffer, so the canvas can be read back for exports.
      const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
      if (!gl) return;
      glRef.current = { gl, uniforms: compile(gl) };
    }
    const { gl, uniforms } = glRef.current;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uniforms.size, canvas.width, canvas.height);
    gl.uniform1f(uniforms.time, t);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, [t, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={Math.round(width / 2)}
      height={Math.round(height / 2)}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
