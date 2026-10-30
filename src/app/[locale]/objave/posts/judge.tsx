"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { instrumentSerif, plexMono } from "@/src/app/fonts";
import { JudgePost, WorkshopPost } from "../data";
import {
  GRAY,
  Header,
  NotchButton,
  PostFrame,
  PostProps,
  isCompact,
} from "../frame";
import { CHROME, PhotoWindow } from "./workshop";

export const JUDGE_DURATION = 4.5;
export const JUDGE_STILL = 3.5;

/**
 * A jury member, laid out like the workshop posts: the header, their photo in
 * a desktop window titled "Žirija #n" on the red monitor, and their name and
 * role centred under it. The window opening is the only motion.
 */
export function JudgePostView({
  t,
  format,
  data,
}: PostProps<JudgePost & { number?: number }>) {
  const tPosts = useTranslations("Posts.jury");
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const headerBottom = compact ? 310 : 390;
  const bottom = compact ? 64 : 88;
  const gap = compact ? 28 : 40;
  const textBlock = compact ? 140 : tall ? 240 : 180;
  const photoHeight = Math.min(
    ((format.width - 104 - 12) * 3) / 4,
    format.height - bottom - textBlock - gap - (headerBottom + gap) - CHROME,
  );
  const photoWidth = (photoHeight * 4) / 3;
  // Window and text are one group, centred under the header, so the text
  // stays right under the photo even where the frame has height to spare.
  const groupHeight = photoHeight + CHROME + gap + textBlock;
  const windowTop =
    headerBottom +
    gap +
    (format.height - bottom - headerBottom - gap - groupHeight) / 2;
  const textTop = windowTop + photoHeight + CHROME + gap;
  const title = data.number
    ? `${tPosts("kicker")} #${data.number}`
    : tPosts("kicker");
  // The window reads a workshop's fields; a judge is the speaker.
  const windowData = { ...data, speaker: data.name } as unknown as WorkshopPost;

  return (
    <PostFrame t={t} format={format}>
      <Header t={t} format={format} align="center" still />
      <PhotoWindow
        t={t}
        data={windowData}
        title={title}
        left={(format.width - photoWidth - 12) / 2}
        top={windowTop}
        photoWidth={photoWidth}
        photoHeight={photoHeight}
      />
      {/* The site's button, smaller, pinned over the window's corner. */}
      <NotchButton
        size="sm"
        className="absolute"
        style={{
          fontSize: compact ? 20 : 24,
          padding: compact ? "10px 22px" : "12px 26px",
          right: (format.width - photoWidth - 12) / 2 - 18,
          top: windowTop + photoHeight + CHROME - 28,
        }}
      >
        {tPosts("tag")}
      </NotchButton>
      <div
        className="absolute inset-x-[52px] flex flex-col items-center justify-start gap-[10px] text-center"
        style={{ top: textTop, height: textBlock }}
      >
        <p
          className={clsx(instrumentSerif.className, "leading-none")}
          style={{ fontSize: compact ? 64 : tall ? 96 : 80 }}
        >
          {data.name}
        </p>
        {data.role && (
          <p
            className={clsx(plexMono.className, "tracking-[0.02em]")}
            style={{ fontSize: compact ? 22 : 28, color: GRAY }}
          >
            {data.role}
          </p>
        )}
      </div>
    </PostFrame>
  );
}
