/**
 * Classic 3D bevel of an old Windows UI element: light on the top/left edges,
 * dark on the bottom/right ones. `sunken` is the same trick, inverted. Shared
 * by the site frame, the navbar and the windows so they read as one system.
 */
export const raised =
  "border-2 border-t-gray100 border-l-gray100 border-r-gray900 border-b-gray900";
export const sunken =
  "border-2 border-t-gray900 border-l-gray900 border-r-gray100 border-b-gray100";
