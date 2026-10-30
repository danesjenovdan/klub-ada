"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import { IconPencil } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { plexMono } from "@/src/app/fonts";
import { WorkshopPost } from "./data";
import { DEFAULT_CROP } from "./posts/screen-photo";

export const field = clsx(
  plexMono.className,
  // 16px on a phone: iOS zooms the page in on focus for anything smaller.
  "w-full border border-[rgba(255,87,87,0.35)] bg-[#0c0303] px-3 py-2 text-base text-[#fafafa] outline-none focus-visible:border-[#ff5757] md:text-sm",
);

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span
        className={clsx(
          plexMono.className,
          "text-[10px] uppercase tracking-[0.16em] text-gray400",
        )}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

/**
 * Edit a workshop post on the page: swap the speaker's photo and change the
 * title, name and role. Changes live in this page only and go into the
 * exported PNG and video; Sanity is left untouched.
 */
export function WorkshopEditor({
  value,
  onChange,
  onReset,
}: {
  /** The workshop as it is shown now, edits included. */
  value: WorkshopPost;
  onChange: (edit: Partial<WorkshopPost>) => void;
  onReset: () => void;
}) {
  const t = useTranslations("Posts.editor");

  return (
    <details className="group border-2 border-[#ff5757]">
      {/* As loud as the download buttons above it, so the editor is found. */}
      <summary
        className={clsx(
          plexMono.className,
          "flex cursor-pointer select-none items-center gap-3 px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#fafafa] transition-colors marker:content-none hover:bg-[rgba(255,87,87,0.15)] group-open:bg-[rgba(255,87,87,0.15)] [&::-webkit-details-marker]:hidden",
        )}
      >
        <IconPencil size={18} stroke={2} className="text-[#ff5757]" />
        {t("edit")}
        <span className="ml-auto text-lg leading-none text-[#ff5757] transition-transform group-open:rotate-90">
          ›
        </span>
      </summary>
      <div className="flex flex-col gap-3 p-3 pt-1">
        <Field label={t("photo")}>
          <input
            type="file"
            accept="image/*"
            className={clsx(
              field,
              "file:mr-3 file:border-0 file:bg-[#ff5757] file:px-2 file:py-1 file:text-black",
            )}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                onChange({
                  photo: undefined,
                  photoUrl: URL.createObjectURL(file),
                });
              }
            }}
          />
        </Field>
        {/* Framing: zoom in, and move the photo so the face sits well. */}
        {(
          [
            ["zoom", "photoZoom", 1, 2.5, DEFAULT_CROP.zoom],
            ["position_y", "photoY", 0, 1, DEFAULT_CROP.y],
            ["position_x", "photoX", 0, 1, DEFAULT_CROP.x],
          ] as const
        ).map(([label, key, min, max, fallback]) => (
          <Field key={key} label={t(label)}>
            <input
              type="range"
              min={min}
              max={max}
              step={0.01}
              value={value[key] ?? fallback}
              onChange={(event) =>
                onChange({ [key]: Number(event.target.value) })
              }
              className="w-full accent-[#ff5757]"
            />
          </Field>
        ))}
        <Field label={t("title")}>
          <input
            className={field}
            value={value.title}
            onChange={(event) => onChange({ title: event.target.value })}
          />
        </Field>
        <Field label={t("speaker")}>
          <input
            className={field}
            value={value.speaker}
            onChange={(event) => onChange({ speaker: event.target.value })}
          />
        </Field>
        <Field label={t("role")}>
          <input
            className={field}
            value={value.speakerRole ?? ""}
            onChange={(event) => onChange({ speakerRole: event.target.value })}
          />
        </Field>
        <button
          type="button"
          onClick={onReset}
          className={clsx(
            plexMono.className,
            "self-start text-xs uppercase tracking-[0.12em] text-gray400 underline underline-offset-4 hover:text-white",
          )}
        >
          {t("reset")}
        </button>
      </div>
    </details>
  );
}
