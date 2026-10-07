"use client";

import { ReactNode } from "react";
import { Format } from "./formats";
import { PostsContent, WorkshopPost, RewardPost, JudgePost } from "./data";
import { AWARD_DURATION, AWARD_STILL, AwardPostView } from "./posts/award";
import {
  GALLERY_VARIANTS,
  GalleryPostView,
  GalleryVariant,
} from "./posts/gallery";
import {
  SPONSOR_VARIANTS,
  SponsorPostView,
  SponsorVariant,
} from "./posts/sponsor";
import {
  TIMELINE_DURATION,
  TIMELINE_STILL,
  TimelinePostView,
} from "./posts/timeline";
import {
  NUMBERS_DURATION,
  NUMBERS_STILL,
  NumbersPostView,
} from "./posts/numbers";
import {
  COUNTDOWN_DAYS,
  COUNTDOWN_DURATION,
  COUNTDOWN_STILL,
  CountdownPostView,
} from "./posts/countdown";
import { JUDGE_DURATION, JUDGE_STILL, JudgePostView } from "./posts/judge";
import {
  FAQ_DURATION,
  FAQ_STILL,
  FaqCoverView,
  FaqItemView,
} from "./posts/faq";
import {
  BATCHES,
  REGISTRATION_VARIANTS,
  Registration,
  RegistrationPostView,
  RegistrationVariant,
} from "./posts/registration";
import {
  WEBSITE_DURATION,
  WEBSITE_STILL,
  WebsitePostView,
} from "./posts/website";
import {
  SAVE_THE_DATE_DURATION,
  SAVE_THE_DATE_STILL,
  SaveTheDatePostView,
} from "./posts/save-the-date";
import {
  WORKSHOP_DURATION,
  WORKSHOP_STILL,
  WorkshopPostView,
} from "./posts/workshop";

export type Category =
  | "savethedate"
  | "website"
  | "registration"
  | "numbers"
  | "countdown"
  | "sponsors"
  | "awards"
  | "timeline"
  | "workshops"
  | "jury"
  | "faq"
  | "pictures";

export const CATEGORIES: Category[] = [
  "savethedate",
  "website",
  "registration",
  "numbers",
  "countdown",
  "sponsors",
  "awards",
  "timeline",
  "workshops",
  "jury",
  "faq",
  "pictures",
];

export type PostDef = {
  id: string;
  category: Category;
  /** Shown under the preview and used in the file name. */
  label: string;
  /** Length of the clip in seconds. */
  duration: number;
  /** The moment used for the PNG: everything in, nothing mid-flight. */
  still: number;
  /** A made-up post standing in until there is real content. */
  isExample?: boolean;
  /** Which layout it is drawn in, for categories that come in several. */
  variant?: string;
  render: (t: number, format: Format) => ReactNode;
};

const slug = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const fileName = (post: PostDef, format: Format, extension: string) =>
  [
    "adahack",
    post.category,
    slug(post.label),
    post.variant,
    `${format.id}.${extension}`,
  ]
    .filter(Boolean)
    .join("-");

/** The layout picked for each category that comes in several. */
export type Variants = {
  sponsors: SponsorVariant;
  registration: RegistrationVariant;
  pictures: GalleryVariant;
};

/** Every post the content makes, in the order they are shown. */
export function buildPosts(
  content: PostsContent,
  exampleWorkshop: WorkshopPost,
  variants: Variants,
  /** Changes made on the page to a workshop, by its id, over the Sanity data. */
  workshopEdits: Record<string, Partial<WorkshopPost>> = {},
  /** Changes made on the page to an award, by its id, over the Sanity data. */
  rewardEdits: Record<string, Partial<RewardPost>> = {},
  /** Shown until the first judge is in Sanity. */
  exampleJudge?: JudgePost,
  /** Changes made on the page to a judge, by its id, over the Sanity data. */
  judgeEdits: Record<string, Partial<JudgePost>> = {},
): PostDef[] {
  const sponsorVariant = SPONSOR_VARIANTS.find(
    (v) => v.id === variants.sponsors,
  )!;
  const registrationVariant = REGISTRATION_VARIANTS.find(
    (v) => v.id === variants.registration,
  )!;
  const registrations: Registration[] = [
    { kind: "open" },
    ...Array.from({ length: BATCHES }, (_, index) => ({
      kind: "soldout" as const,
      batch: index + 1,
    })),
  ];
  const galleryVariant = GALLERY_VARIANTS.find(
    (v) => v.id === variants.pictures,
  )!;
  const workshops = content.workshops.length
    ? content.workshops
    : [exampleWorkshop];

  return [
    {
      id: "save-the-date",
      category: "savethedate",
      label: "AdaHack 2026",
      duration: SAVE_THE_DATE_DURATION,
      still: SAVE_THE_DATE_STILL,
      render: (t, format) => (
        <SaveTheDatePostView t={t} format={format} data={null} />
      ),
    } satisfies PostDef,
    {
      id: "website",
      category: "website",
      label: "hack.klub-ada.si",
      duration: WEBSITE_DURATION,
      still: WEBSITE_STILL,
      render: (t, format) => (
        <WebsitePostView t={t} format={format} data={null} />
      ),
    } satisfies PostDef,
    ...registrations.map(
      (registration): PostDef => ({
        id:
          registration.kind === "open"
            ? "registration-open"
            : `registration-batch-${registration.batch}`,
        category: "registration",
        label:
          registration.kind === "open"
            ? "1 open"
            : `${registration.batch + 1} batch ${registration.batch} sold out`,
        variant: registrationVariant.id,
        duration: registrationVariant.duration,
        still: registrationVariant.still,
        render: (t, format) => (
          <RegistrationPostView
            t={t}
            format={format}
            data={registration}
            variant={variants.registration}
          />
        ),
      }),
    ),
    {
      id: "numbers-2025",
      category: "numbers",
      label: "AdaHack 2025",
      duration: NUMBERS_DURATION,
      still: NUMBERS_STILL,
      render: (t, format) => (
        <NumbersPostView t={t} format={format} data={null} />
      ),
    } satisfies PostDef,
    ...COUNTDOWN_DAYS.map(
      (days): PostDef => ({
        id: `countdown-${days}`,
        category: "countdown",
        // Zero-padded, so the files sort from the furthest out.
        label: `${String(days).padStart(2, "0")} dni`,
        duration: COUNTDOWN_DURATION,
        still: COUNTDOWN_STILL,
        render: (t, format) => (
          <CountdownPostView t={t} format={format} data={days} />
        ),
      }),
    ),
    ...content.sponsors.map(
      (sponsor): PostDef => ({
        id: sponsor._id,
        category: "sponsors",
        label: sponsor.name,
        variant: sponsorVariant.id,
        duration: sponsorVariant.duration,
        still: sponsorVariant.still,
        render: (t, format) => (
          <SponsorPostView
            t={t}
            format={format}
            data={sponsor}
            variant={variants.sponsors}
          />
        ),
      }),
    ),
    ...content.rewards.map((sanityReward): PostDef => {
      const reward = { ...sanityReward, ...rewardEdits[sanityReward._id] };
      return {
        id: reward._id,
        category: "awards",
        label: reward.title,
        duration: AWARD_DURATION,
        still: AWARD_STILL,
        render: (t, format) => (
          <AwardPostView t={t} format={format} data={reward} />
        ),
      };
    }),
    ...(content.timeline.length
      ? [
          {
            id: "timeline",
            category: "timeline",
            label: "AdaHack 2026",
            duration: TIMELINE_DURATION,
            still: TIMELINE_STILL,
            render: (t, format) => (
              <TimelinePostView t={t} format={format} data={content.timeline} />
            ),
          } satisfies PostDef,
        ]
      : []),
    ...workshops.map((sanityWorkshop, index): PostDef => {
      const workshop = {
        ...sanityWorkshop,
        ...workshopEdits[sanityWorkshop._id],
        number: index + 1,
      };
      return {
        id: workshop._id,
        category: "workshops",
        label: workshop.title,
        duration: WORKSHOP_DURATION,
        still: WORKSHOP_STILL,
        isExample: workshop.isExample,
        render: (t, format) => (
          <WorkshopPostView t={t} format={format} data={workshop} />
        ),
      };
    }),
    ...(content.judges.length
      ? content.judges
      : exampleJudge
        ? [exampleJudge]
        : []
    ).map((sanityJudge, index): PostDef => {
      const judge = {
        ...sanityJudge,
        ...judgeEdits[sanityJudge._id],
        number: index + 1,
      };
      return {
        id: judge._id,
        category: "jury",
        label: judge.name,
        duration: JUDGE_DURATION,
        still: JUDGE_STILL,
        isExample: judge.isExample,
        render: (t, format) => (
          <JudgePostView t={t} format={format} data={judge} />
        ),
      };
    }),
    ...(content.faq.length
      ? [
          {
            id: "faq-cover",
            category: "faq",
            label: "00 FAQ",
            duration: FAQ_DURATION,
            still: FAQ_STILL,
            render: (t, format) => (
              <FaqCoverView t={t} format={format} data={content.faq} />
            ),
          } satisfies PostDef,
          ...content.faq.map(
            (item, index): PostDef => ({
              id: item._id,
              category: "faq",
              // Numbered, so the files sort into the carousel's order.
              label: `${String(index + 1).padStart(2, "0")} ${item.question}`,
              duration: FAQ_DURATION,
              still: FAQ_STILL,
              render: (t, format) => (
                <FaqItemView
                  t={t}
                  format={format}
                  data={{ items: content.faq, index }}
                />
              ),
            }),
          ),
        ]
      : []),
    ...(content.gallery?.photos?.length
      ? [
          {
            id: "gallery",
            category: "pictures",
            label: `AdaHack ${content.gallery.year}`,
            variant: galleryVariant.id,
            duration: galleryVariant.duration,
            still: galleryVariant.still,
            render: (t, format) => (
              <GalleryPostView
                t={t}
                format={format}
                data={content.gallery!}
                variant={variants.pictures}
              />
            ),
          } satisfies PostDef,
        ]
      : []),
  ];
}
