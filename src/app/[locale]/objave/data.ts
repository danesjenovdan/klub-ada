import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Tier } from "@/src/app/hack/[locale]/sponsors/model";

/*
 * Everything the posts are made of, in one GROQ round trip. Translated fields
 * are objects with `sl` and `en`, read with `coalesce` like the hackathon site.
 */
export const GET_POSTS_CONTENT = `{
  'sponsors': *[_type == "hack26Sponsor"] | order(name) {
    _id,
    name,
    type,
    image,
    'dimensions': image.asset->metadata.dimensions
  },
  'rewards': *[_type == "hack26Reward"] | order(_createdAt) {
    _id,
    'title': coalesce(title[$language], title.sl),
    'subtitle': coalesce(subtitle[$language], subtitle.sl),
    'amount': coalesce(amount[$language], amount.sl),
    isMain,
    icon
  },
  'timeline': *[_type == "hack26TimelineItem"] | order(time) {
    _id,
    'title': coalesce(label[$language], label.sl),
    time,
    endTime,
    'icon': icon.asset->url,
    'tag': coalesce(tag[$language], tag.sl)
  },
  'workshops': *[_type == "hack26Workshop"] | order(time) {
    _id,
    'title': coalesce(title[$language], title.sl),
    speaker,
    'speakerRole': coalesce(speakerRole[$language], speakerRole.sl),
    photo,
    time,
    endTime,
    'description': coalesce(description[$language], description.sl)
  },
  'faq': *[_type == "hackathonFaqItem"] | order(order asc) {
    _id,
    'question': coalesce(question[$language], question.sl),
    'answer': coalesce(answer[$language], answer.sl)
  },
  'judges': *[_type == "hack26Judge"] | order(order asc) {
    _id,
    name,
    'role': coalesce(role[$language], role.sl),
    photo
  },
  'gallery': *[_type == "hackathonGallery"] | order(year desc)[0] {
    year,
    'photos': images[] { ..., alt, 'dimensions': asset->metadata.dimensions }
  }
}`;

export type SponsorPost = {
  _id: string;
  name: string;
  type: Tier;
  image: SanityImageSource;
  dimensions?: { width: number; height: number };
};

export type RewardPost = {
  _id: string;
  title: string;
  subtitle?: string;
  amount: string;
  isMain?: boolean;
  icon?: SanityImageSource;
};

export type TimelinePostItem = {
  _id: string;
  title: string;
  time: string;
  endTime?: string;
  /** Plain CDN URL of the 32px pixel icon. */
  icon?: string;
  tag?: string;
};

export type WorkshopPost = {
  _id: string;
  title: string;
  speaker: string;
  speakerRole?: string;
  photo?: SanityImageSource;
  /** A local image instead of a Sanity one, for the example workshop. */
  photoUrl?: string;
  /** How the photo is framed: zoom, and where it is centred (0..1). */
  photoZoom?: number;
  photoX?: number;
  photoY?: number;
  time?: string;
  endTime?: string;
  description?: string;
  /** Not in Sanity: the sample shown until a real workshop exists. */
  isExample?: boolean;
  /** Its place in the programme, for "Workshop #1". Set when the posts are built. */
  number?: number;
};

export type GalleryPhoto = SanityImageSource & {
  alt?: string;
  dimensions?: { width: number; height: number };
};

export type GalleryPost = { year: number; photos: GalleryPhoto[] };

export type JudgePost = {
  _id: string;
  name: string;
  role?: string;
  photo?: SanityImageSource;
  /** A local image instead of a Sanity one, for the example judge. */
  photoUrl?: string;
  photoZoom?: number;
  photoX?: number;
  photoY?: number;
  /** Not in Sanity: the sample shown until a real judge exists. */
  isExample?: boolean;
};

export type FaqItem = { _id: string; question: string; answer: string };

export type PostsContent = {
  sponsors: SponsorPost[];
  rewards: RewardPost[];
  timeline: TimelinePostItem[];
  workshops: WorkshopPost[];
  faq: FaqItem[];
  judges: JudgePost[];
  gallery: GalleryPost | null;
};

/** Times on the posts are Ljubljana time, whatever the viewer's machine says. */
const TIME_ZONE = "Europe/Ljubljana";

/** "10.00", the site's way of writing a time. */
export const formatClock = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  })
    .format(new Date(iso))
    .replace(":", ".");

/** "sob 21.11." */
export const formatDay = (iso: string, locale: string) => {
  const date = new Date(iso);
  const weekday = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    timeZone: TIME_ZONE,
  })
    .format(date)
    .replace(".", "");
  const [day, month] = new Intl.DateTimeFormat("sl", {
    day: "numeric",
    month: "numeric",
    timeZone: TIME_ZONE,
  })
    .format(date)
    .split(".")
    .map((part) => part.trim());
  return `${weekday} ${day}.${month}.`;
};

/** The calendar day an item falls on in Ljubljana, for grouping by day. */
export const dayKey = (iso: string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(
    new Date(iso),
  );
