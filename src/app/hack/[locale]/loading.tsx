import { WindowSkeleton } from "./components/window-skeleton";

/**
 * Route-level loading state for every hackathon subpage. Next renders it as
 * the Suspense fallback while a subpage's code and data are still on their
 * way, so a click on a desktop shortcut answers immediately with the window
 * frame and the loading bar instead of a pause.
 */
export default function Loading() {
  return <WindowSkeleton />;
}
