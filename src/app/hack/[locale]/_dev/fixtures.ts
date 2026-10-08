import type { SanityFixtures } from "@/src/app/utils/use-sanity-data";

/*
 * Stress-test content for the hackathon windows, swapped in for the Sanity
 * query results by the dev-only data toggle (`?data=worst|empty|one|many`).
 * Shaped exactly like each query's result. Every value is something an editor
 * could plausibly type into the Studio - none of these fields has a length
 * limit - or real content rearranged.
 */

const image = (ref: string) => ({
  _type: "image",
  asset: { _ref: ref, _type: "reference" },
});

const repeat = <T>(list: T[], length: number, map?: (item: T, i: number) => T) =>
  Array.from({ length }, (_, i) => {
    const item = list[i % list.length];
    return map ? map(item, i) : item;
  });

/* ----------------------------------------------------------------- FAQ --- */

const FAQ_WORST = [
  {
    question:
      "Ali lahko sodelujem, če sem študentka prvega letnika in še nikoli nisem programirala v nobenem programskem jeziku?",
    answer:
      "Seveda! Hekaton je namenjen učenju.\n\nPrijaviš se na https://www.eventbrite.example.com/e/adahack-2026-code-for-change-tickets-1032847561923?aff=oddtdtcreator\n\nMesta so omejena.",
  },
  { question: "Kdaj?", answer: "21. 11." },
  {
    question: "Komu pišem glede sponzorstva?",
    answer:
      "Piši na sponzorstva.adahack-2026@partnerstva.klub-ada.example.com in odgovorimo ti v treh dneh.",
  },
  {
    question: "Kakšna je velikost ekip?",
    answer: "Velikost ekip je 2-4 udeleženci.",
  },
  // The same question twice: an editor duplicated the document to edit it.
  {
    question: "Kakšna je velikost ekip?",
    answer: "Od 2 do 4, mentor se ne šteje.",
  },
  {
    question: "Kateri hashtag uporabimo na Instagramu?",
    answer: "#AdaHack2026CodeForChange in #KlubAdaWomenInTechSlovenia",
  },
  {
    question: "Ali krijete potne stroške?",
    answer: "**Ne.** Potnih stroškov in nastanitve letos ne krijemo <3",
  },
  { question: "Ali bo hrana veganska? 🌱🥑", answer: "Ja 🌱" },
];

export const FAQ_FIXTURES: SanityFixtures = {
  worst: FAQ_WORST,
  empty: [],
  one: [FAQ_WORST[1]],
  many: repeat(FAQ_WORST, 40, (item, i) => ({
    ...item,
    question: `${item.question} (${i + 1})`,
  })),
};

/* ------------------------------------------------------------- Rewards --- */

const ICON = image("image-1fc42c8d08b5846c1cfb48ab91037b56200bfb11-25x24-svg");

const REWARDS_WORST = [
  {
    title: "1. mesto",
    subtitle:
      "Plus trimesečni inkubacijski program v Tehnološkem parku Ljubljana",
    amount: "2.500 € + mentorstvo",
    isMain: true,
    icon: ICON,
  },
  {
    title: "Nagrada za najboljšo uporabo odprtokodnih tehnologij",
    subtitle: null,
    amount: "TBD",
    isMain: false,
    icon: null,
  },
  // Two sponsor challenges with the same prize name.
  {
    title: "Posebna nagrada",
    subtitle: "Sportradar",
    amount: "500 €",
    isMain: false,
    icon: ICON,
  },
  {
    title: "Posebna nagrada",
    subtitle: "Siemens",
    amount: "500 €",
    isMain: false,
    icon: ICON,
  },
  {
    title: "Nagrada občinstva",
    subtitle: "Prenosnik za vsako članico ekipe",
    amount: "MacBook Air",
    isMain: false,
    icon: ICON,
  },
  {
    title: "Najboljša predstavitev",
    subtitle: null,
    amount: "300 €",
    isMain: false,
    icon: null,
  },
  {
    title: "Nagrada žirije",
    subtitle: "TBD",
    amount: "1.000 €",
    isMain: false,
    icon: ICON,
  },
];

export const REWARDS_FIXTURES: SanityFixtures = {
  worst: REWARDS_WORST,
  empty: [],
  one: [REWARDS_WORST[0]],
  many: repeat(REWARDS_WORST, 15, (item, i) => ({
    ...item,
    title: `${item.title} ${i + 1}`,
  })),
};

/* ------------------------------------------------------------ Timeline --- */

const TIMELINE_ICONS = [
  "image-5921a5f4aba3241aef9d32416819eb83b23a86db-32x32-svg",
  "image-82c857bf35294ca472bbb5364e5e62906155a405-32x32-svg",
  "image-a0dce902a6b28223bcedfd58cfacf89f2f44255f-32x32-svg",
  "image-c555e69b3e5b121487b47a41edc081298685ed22-32x32-svg",
  "image-706a7b23008b0979ffeebabc2312461ff79d2878-32x32-svg",
].map(image);

type TimelineDraft = {
  title: string;
  description?: string | null;
  tag?: string | null;
  icon?: boolean;
  /** Hours the slot lasts; no end time when left out. */
  hours?: number;
};

const TIMELINE_WORST: TimelineDraft[] = [
  { title: "Registracija", description: "Pridi po goodie bag.", hours: 1 },
  { title: "Otvoritev in predstavitev izzivov", hours: 1 },
  {
    title: "Delavnica: Uvod v strojno učenje s PyTorch",
    tag: "OBVEZNA PRIJAVA PREKO OBRAZCA",
    hours: 1,
  },
  {
    title: "Hekanje",
    description:
      "Zdaj lahko začneš z delom. Če potrebuješ pomoč, bodo predstavniki podjetij čez dan v stavbi in ti bodo z veseljem odgovorili na vprašanja o izzivih, podatkih in API-jih. Mentorji bodo na voljo v sobi 2.04 v drugem nadstropju, za tehnične težave z omrežjem pa se obrni na organizatorke pri registraciji. Ne pozabi na odmore, vodo in sončno svetlobo - hekaton je maraton, ne šprint. Ob 18.00 bo kratek pregled napredka, ob 23.30 pa polnočni prigrizek.",
    tag: "+10 HP",
    hours: 1,
  },
  { title: "Iskanje ekipe", icon: false, hours: 1 },
  { title: "Večerja", description: null, hours: 1 },
  { title: "Polnočni prigrizek 🍕", tag: "MAX PARTY: 4", hours: 2 },
  { title: "Sponzorsko-mentorski obhod", icon: false },
  { title: "Oddaja rešitev", tag: "ROK: 09.00 - BREZ PODALJŠANJA", hours: 1 },
  { title: "Predstavitve", tag: "3 MIN", hours: 1 },
  { title: "Ocenjevanje", hours: 1 },
  { title: "Razglasitev zmagovalcev in podelitev nagrad", hours: 1 },
];

/**
 * Times relative to now, so the fourth item ("Hekanje") is the one happening
 * and everything before it is in the past.
 */
const timelineAround = (drafts: TimelineDraft[], currentIndex: number) => {
  const hour = 60 * 60 * 1000;
  const start = Date.now() - (currentIndex + 0.5) * hour;
  return drafts.map(({ title, description, tag, icon = true, hours }, i) => {
    const time = start + i * hour;
    return {
      title,
      time: new Date(time).toISOString(),
      endTime: hours ? new Date(time + hours * hour).toISOString() : undefined,
      icon: icon ? TIMELINE_ICONS[i % TIMELINE_ICONS.length] : undefined,
      description:
        description === undefined
          ? "Pridi po kalorije, da boš imel(a) dovolj energije."
          : description,
      tag,
    };
  });
};

export const TIMELINE_FIXTURES: SanityFixtures = {
  worst: () => timelineAround(TIMELINE_WORST, 3),
  empty: [],
  one: () => timelineAround([TIMELINE_WORST[3]], 0),
  many: () =>
    timelineAround(
      repeat(TIMELINE_WORST, 30, (item, i) => ({
        ...item,
        title: `${item.title} ${i + 1}`,
      })),
      20,
    ),
};

/* ------------------------------------------------------------ Sponsors --- */

type Logo = { ref: string; width: number; height: number };

const LOGOS: Record<string, Logo> = {
  epilog: {
    ref: "image-8a15ae98ccbe9b63a621d0f43a78249c0c76367b-900x350-png",
    width: 900,
    height: 350,
  },
  ixtlan: {
    ref: "image-d830197dddd7b3be04c67fde879df0d590efe833-170x50-svg",
    width: 170,
    height: 50,
  },
  flowout: {
    ref: "image-38708e98873e4fad81f6dec8ef688187f593203f-1941x456-png",
    width: 1941,
    height: 456,
  },
  sportradar: {
    ref: "image-c13c3aea3e767c7cb6db589658196f1d16dee8fd-2827x348-png",
    width: 2827,
    height: 348,
  },
  siemens: {
    ref: "image-e7eef05376f8bc896e4f7269fe8cf7ffb7e7ccd2-1501x240-svg",
    width: 1501,
    height: 240,
  },
  arctur: {
    ref: "image-760a831625098e0e0d170f52e588eaf8ab91d4a2-1828x530-png",
    width: 1828,
    height: 530,
  },
  // A square mark, the shape most sponsors' social avatars come in.
  square: {
    ref: "image-0c12a410305c23f44940dcb957a9213dd691cc02-644x644-png",
    width: 644,
    height: 644,
  },
  // An asset that was deleted from the dataset after it was referenced.
  missing: {
    ref: "image-0000000000000000000000000000000000000000-900x350-png",
    width: 900,
    height: 350,
  },
};

const sponsor = (name: string, type: string, logo: Logo, link?: string) => ({
  name,
  type,
  link: link ?? "https://example.com/",
  image: image(logo.ref),
  dimensions: { width: logo.width, height: logo.height },
});

const GOLD = [
  sponsor("Epilog", "gold", LOGOS.epilog),
  sponsor("Ixtlan team", "gold", LOGOS.ixtlan),
  sponsor("Flowout", "gold", LOGOS.flowout),
  sponsor("Sportradar", "gold", LOGOS.sportradar),
  sponsor("Siemens", "gold", LOGOS.siemens),
  sponsor("Arctur", "gold", LOGOS.arctur),
  sponsor("Kvadrat", "gold", LOGOS.square),
  sponsor("Epilog Labs", "gold", LOGOS.epilog),
  sponsor("Ixtlan", "gold", LOGOS.ixtlan),
];

const SPONSORS_WORST = [
  ...GOLD,
  sponsor("Kvadrat d.o.o.", "silver", LOGOS.square),
  sponsor("Nil", "bronze", LOGOS.missing),
  sponsor("Sportradar AG", "bronze", LOGOS.sportradar),
  sponsor(
    "Zavod za razvoj in promocijo ženskih kariernih poti v tehnologiji",
    "partner",
    LOGOS.flowout,
    "https://example.com/zavod/o-nas/partnerstva/adahack-2026?utm_source=klub-ada&utm_medium=sponsor-planet",
  ),
  sponsor("Siemens Mobility", "vibe", LOGOS.siemens),
];

export const SPONSORS_FIXTURES: SanityFixtures = {
  worst: SPONSORS_WORST,
  empty: [],
  one: [GOLD[0]],
  many: [
    ...repeat(GOLD, 30, (item, i) => ({ ...item, name: `${item.name} ${i}` })),
    ...SPONSORS_WORST.slice(GOLD.length),
  ],
};

/* ------------------------------------------------------------- Gallery --- */

const PHOTOS = [
  // Portrait first, so it is the one shown on arrival.
  { ref: "image-055baefba34a619351423b77e26998fba090e3ab-4672x7008-jpg", alt: "audience 2" },
  { ref: "image-f16ff10746a337aa3fd9ef8ab4a1972dd7b927db-6755x4503-jpg", alt: undefined },
  { ref: "image-59be57727921964bd9b463ad2975aefc8e0f3681-7008x4672-jpg", alt: "stickers" },
  { ref: "image-31bc43272d084d5641ee2e8c869f132504d3abd7-4107x6160-jpg", alt: "" },
  { ref: "image-0176f81e112c10ded8f3cb91bec71d7551b530c7-6401x4267-jpg", alt: "hackathon" },
].map(({ ref, alt }) => ({ ...image(ref), alt }));

export const GALLERY_FIXTURES: SanityFixtures = {
  worst: repeat(PHOTOS, 40),
  // No gallery document for the year: `[0].images` is null, not [].
  empty: null,
  one: [PHOTOS[0]],
  many: repeat(PHOTOS, 150),
};
