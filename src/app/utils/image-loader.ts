import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

/**
 * Builds a Sanity CDN URL for an image. Pass a `width` to have Sanity resize
 * and re-encode the image itself rather than shipping the full-size original
 * for Next to shrink - worth doing anywhere many images load at once.
 */
export default function imageLoader(src?: SanityImageSource, width?: number) {
  if (!src) return "/assets/placeholder.svg";

  const image = urlFor(src);
  return (width ? image.width(width).format("webp") : image)?.url();
}
