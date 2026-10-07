"use client";

import clsx from "clsx";
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
