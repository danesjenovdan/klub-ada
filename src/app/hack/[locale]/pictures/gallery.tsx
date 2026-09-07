"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageLoader from "@/src/app/utils/image-loader";
import { useSanityData } from "@/src/app/utils/use-sanity-data";

const GET_GALLERY = `*[
  _type == "hackathonGallery" && year == $year
][0].images[]{ ..., alt }`;

type GalleryPhoto = SanityImageSource & { alt?: string };

/** The edition this page shows. The window title names it too. */
const GALLERY_YEAR = 2025;

/** Widths we ask Sanity to resize to, rather than pulling full-size originals. */
const THUMBNAIL_WIDTH = 400;
const PREVIEW_WIDTH = 1600;

/**
 * Photos of the hackathon, browsed the way Finder's gallery view does it: one
 * large preview fitted to the window, a filmstrip of thumbnails underneath, and
 * the arrow keys to move between them.
 */
export function Gallery() {
  const t = useTranslations("Hackathon");
  const { data } = useSanityData({
    query: GET_GALLERY,
    params: { year: GALLERY_YEAR },
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const filmstripRef = useRef<HTMLDivElement>(null);

  const photos = (data || []) as GalleryPhoto[];

  // Drag the selected thumbnail back into view as the selection walks off the
  // end of the strip.
  useEffect(() => {
    filmstripRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ inline: "nearest", block: "nearest" });
  }, [selectedIndex]);

  if (!photos.length) {
    return <p className="font-paragraph text-base">{t("main_cta")}</p>;
  }

  const selectedPhoto = photos[selectedIndex];
  const photoLabel = (photo: GalleryPhoto, index: number) =>
    photo.alt || t("photo_number", { number: index + 1 });

  const moveSelection = (delta: number) =>
    setSelectedIndex((index) =>
      Math.min(Math.max(index + delta, 0), photos.length - 1),
    );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") moveSelection(-1);
    else if (event.key === "ArrowRight") moveSelection(1);
    else if (event.key === "Home") setSelectedIndex(0);
    else if (event.key === "End") setSelectedIndex(photos.length - 1);
    else return;

    event.preventDefault();
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="relative grow min-h-0">
        <Image
          src={imageLoader(selectedPhoto, PREVIEW_WIDTH)}
          alt={selectedPhoto.alt || ""}
          fill
          sizes="100vw"
          priority
          className="object-contain"
        />
      </div>

      <div
        ref={filmstripRef}
        role="listbox"
        aria-label={t("pages.pictures")}
        aria-activedescendant={`hackathon-photo-${selectedIndex}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        // No focus ring on the strip itself - the selected photo's red frame is
        // what shows where the arrow keys are pointing. `safe center` centres a
        // short strip but falls back to left-aligned once it overflows, so the
        // first thumbnail stays reachable.
        className="shrink-0 flex gap-2 overflow-x-auto outline-none [justify-content:safe_center]"
      >
        {photos.map((photo, index) => (
          <div
            key={index}
            id={`hackathon-photo-${index}`}
            role="option"
            aria-selected={index === selectedIndex}
            aria-label={photoLabel(photo, index)}
            onClick={() => setSelectedIndex(index)}
            className={clsx(
              "relative h-16 w-16 shrink-0 cursor-pointer border-2 md:h-20 md:w-20",
              // A bevel would vanish against a photo, so the selected frame gets
              // the desktop's red accent instead.
              index === selectedIndex
                ? "border-red"
                : "border-transparent opacity-60 hover:opacity-100",
            )}
          >
            <Image
              src={imageLoader(photo, THUMBNAIL_WIDTH)}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
