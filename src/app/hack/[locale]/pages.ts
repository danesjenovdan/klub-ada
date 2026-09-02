/**
 * The subpages that open as windows on top of the hackathon desktop. Shared by
 * the desktop launcher and the windows themselves so labels stay in sync.
 */
export const PAGES = [
  { href: "/sponsors", labelKey: "pages.sponsors" },
  { href: "/rewards", labelKey: "pages.rewards" },
  { href: "/faq", labelKey: "pages.faq" },
  { href: "/timeline", labelKey: "pages.timeline" },
  { href: "/numbers", labelKey: "pages.numbers" },
  { href: "/pictures", labelKey: "pages.pictures" },
] as const;
