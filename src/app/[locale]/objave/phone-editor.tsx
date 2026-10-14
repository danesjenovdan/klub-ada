"use client";

import clsx from "clsx";
import { IconPencil } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { plexMono } from "@/src/app/fonts";
import {
  PhoneScreen,
  Registration,
  usePhoneScreen,
} from "./posts/registration";
import { Field, field } from "./workshop-editor";

/**
 * Edit the lock screen of a registration post in the phone layout: the clock
 * and the two notifications. Changes live in this page only and go into the
 * exported PNG and video. Emptying a notification's text leaves it off.
 */
export function PhoneEditor({
  registration,
  onChange,
  onReset,
}: {
  /** The post's registration, with the lock screen edits made so far. */
  registration: Registration;
  onChange: (edit: PhoneScreen) => void;
  onReset: () => void;
}) {
  const t = useTranslations("Posts.editor");
  const screen = usePhoneScreen(registration);

  const input = (key: keyof PhoneScreen, label: string) => (
    <Field label={label}>
      <input
        className={field}
        value={screen[key]}
        onChange={(event) => onChange({ [key]: event.target.value })}
      />
    </Field>
  );

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
        {t("edit_phone")}
        <span className="ml-auto text-lg leading-none text-[#ff5757] transition-transform group-open:rotate-90">
          ›
        </span>
      </summary>
      <div className="flex flex-col gap-3 p-3 pt-1">
        {input("clock", t("clock"))}
        <div className="grid grid-cols-[1fr_7rem] gap-2">
          {input("first", t("notification", { n: 1 }))}
          {input("firstTime", t("notification_time"))}
        </div>
        <div className="grid grid-cols-[1fr_7rem] gap-2">
          {input("second", t("notification", { n: 2 }))}
          {input("secondTime", t("notification_time"))}
        </div>
        {input("detail", t("notification_detail"))}
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
