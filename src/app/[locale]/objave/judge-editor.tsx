"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { plexMono } from "@/src/app/fonts";
import { JudgePost } from "./data";
import { DEFAULT_CROP } from "./posts/screen-photo";
import { Field, field } from "./workshop-editor";

/**
 * Edit a jury post on the page: swap the photo, frame it, and change the name
 * and role. Changes live in this page only and go into the exports; Sanity is
 * left untouched.
 */
export function JudgeEditor({
  value,
  onChange,
  onReset,
}: {
  /** The judge as shown now, edits included. */
  value: JudgePost;
  onChange: (edit: Partial<JudgePost>) => void;
  onReset: () => void;
}) {
  const t = useTranslations("Posts.editor");

  return (
    <details className="group border border-[rgba(255,87,87,0.25)]">
      <summary
        className={clsx(
          plexMono.className,
          "cursor-pointer select-none px-3 py-2 text-xs uppercase tracking-[0.12em] text-[#ff5757] marker:content-none",
        )}
      >
        <span className="inline-block transition-transform group-open:rotate-90">
          ›
        </span>{" "}
        {t("edit")}
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
        <Field label={t("speaker")}>
          <input
            className={field}
            value={value.name}
            onChange={(event) => onChange({ name: event.target.value })}
          />
        </Field>
        <Field label={t("role")}>
          <input
            className={field}
            value={value.role ?? ""}
            onChange={(event) => onChange({ role: event.target.value })}
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
