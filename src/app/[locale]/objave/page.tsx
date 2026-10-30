import type { Metadata } from "next";
import { Studio } from "./studio";

/**
 * An internal page for the team: the AdaHack 2026 social media posts, built
 * from the Sanity content, previewed with their animation and exported as PNG
 * or MP4. Not linked from the site and kept out of search engines.
 */
export const metadata: Metadata = {
  title: "AdaHack 2026 · Objave",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      {/* The site's layout caps the body's width on a light ground; this tool
          runs edge to edge on the hackathon's dark one. */}
      <style>{"body{max-width:none;background:#0c0303}"}</style>
      <Studio />
    </>
  );
}
