"use client";

import clsx from "clsx";
import { IconPencil } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { plexMono } from "@/src/app/fonts";
import { RewardPost } from "./data";
import { Field, field } from "./workshop-editor";

/**
 * Edit an award post on the page: the prize and the challenge. Changes live
 * in this page only and go into the exported PNG and video; Sanity is left
 * untouched.
 */
export function AwardEditor({
  value,
  onChange,
  onReset,
}: {
  /** The award as it is shown now, edits included. */
  value: RewardPost;
  onChange: (edit: Partial<RewardPost>) => void;
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
        <Field label={t("amount")}>
          <input
            className={field}
            value={value.amount}
            placeholder="2000 €"
            onChange={(event) => onChange({ amount: event.target.value })}
          />
        </Field>
        <Field label={t("title")}>
          <input
            className={field}
            value={value.title}
            onChange={(event) => onChange({ title: event.target.value })}
          />
        </Field>
        <Field label={t("challenge")}>
          <input
            className={field}
            value={value.subtitle ?? ""}
            onChange={(event) => onChange({ subtitle: event.target.value })}
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
