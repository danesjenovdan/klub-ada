export type Page = {
  href: string;
  labelKey: string;
  /**
   * Tailwind classes dropping the shortcut loose on the desktop. A page without
   * one gets a slot in the shortcut column on the left instead.
   */
  position?: string;
};

/**
 * The subpages that open as windows on top of the hackathon desktop. Shared by
 * the desktop shortcuts and the windows themselves so labels stay in sync.
 */
const PAGES: Page[] = [
  { href: "/sponsors", labelKey: "pages.sponsors" },
  { href: "/rewards", labelKey: "pages.rewards" },
  {
    href: "/faq",
    labelKey: "pages.faq",
    // Left lying near the middle of the desktop, a little up and to the left of
    // dead centre.
    position: "left-[44%] top-[30%] -translate-x-1/2 -translate-y-1/2",
  },
  { href: "/timeline", labelKey: "pages.timeline" },
  { href: "/numbers", labelKey: "pages.numbers" },
  { href: "/pictures", labelKey: "pages.pictures" },
];

export const PAGES_WITH_ICONS = PAGES.map((page) => ({
  ...page,
  // Each shortcut's icon is named after its slug.
  icon: `/assets/hackathon26${page.href}.png`,
}));

export type PageWithIcon = (typeof PAGES_WITH_ICONS)[number];

/** Shortcuts lined up in the column on the left. */
export const NAV_PAGES = PAGES_WITH_ICONS.filter(({ position }) => !position);

/** Shortcuts placed by hand somewhere on the desktop. */
export const FLOATING_PAGES = PAGES_WITH_ICONS.filter(
  ({ position }) => position,
);
