import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export default function imageLoader(src?: SanityImageSource) {
  return src ? urlFor(src)?.url() : "/assets/placeholder.svg";
}
