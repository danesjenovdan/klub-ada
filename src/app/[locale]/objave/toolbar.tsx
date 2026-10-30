"use client";

import { ReactNode, useRef } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import {
  IconAdjustmentsHorizontal,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconChevronDown,
  IconX,
} from "@tabler/icons-react";
import { plexMono } from "@/src/app/fonts";
import { FORMATS, Format } from "./formats";
import { LogoMode } from "./frame";
import { CATEGORIES, Category } from "./posts";

/**
 * The red notched button of the posts, for the page's own controls. At least
 * 40px tall on a phone, so it is easy to hit with a thumb.
 */
export const control = clsx(
  plexMono.className,
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap border border-[#ff5757] px-3 py-2 min-h-10 md:min-h-0 text-sm uppercase tracking-[0.1em] transition-colors disabled:cursor-not-allowed disabled:opacity-40",
);

/** The small grey caption in front of a group of controls. */
export const caption = clsx(
  plexMono.className,
  "shrink-0 text-xs uppercase tracking-[0.14em] text-gray400",
);

/** The network a format is for, by its logo. */
function FormatLogo({ id }: { id: Format["id"] }) {
  const Logo = id === "linkedin" ? IconBrandLinkedin : IconBrandInstagram;
  return (
    <Logo
      size={18}
      stroke={1.75}
      aria-label={id === "linkedin" ? "LinkedIn" : "Instagram"}
    />
  );
}

/**
 * Buttons joined into one bar, one of which is on: the format, the logo. One
 * outline around the lot reads as "pick one" better than loose buttons.
 */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  disabled,
  stretch,
  isSmall,
}: {
  label: string;
  options: { id: T; content: ReactNode }[];
  value: T;
  onChange: (id: T) => void;
  disabled?: boolean;
  /** Fill the width, each option an equal share (the phone sheet). */
  stretch?: boolean;
  /** Smaller text and padding, for a secondary choice like a section's layout. */
  isSmall?: boolean;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={clsx(
        "flex divide-x divide-[#ff5757] border border-[#ff5757]",
        stretch ? "w-full" : "w-fit",
      )}
    >
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          disabled={disabled}
          aria-pressed={option.id === value}
          onClick={() => onChange(option.id)}
          className={clsx(
            control,
            "border-0",
            stretch && "flex-1",
            isSmall && "min-h-9 px-2 text-xs tracking-[0.06em] md:px-3",
            option.id === value
              ? "bg-[#ff5757] text-black"
              : "hover:bg-[rgba(255,87,87,0.15)]",
          )}
        >
          {option.content}
        </button>
      ))}
    </div>
  );
}

/** An on/off button with a pixel checkbox, for the date under the logo. */
function Toggle({
  label,
  isOn,
  onChange,
  disabled,
}: {
  label: string;
  isOn: boolean;
  onChange: (isOn: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={() => onChange(!isOn)}
      className={clsx(control, "hover:bg-[rgba(255,87,87,0.15)]")}
    >
      <span
        aria-hidden
        className={clsx(
          "h-3 w-3 border border-[#ff5757]",
          isOn && "bg-[#ff5757] shadow-[inset_0_0_0_2px_#0c0303]",
        )}
      />
      {label}
    </button>
  );
}

export interface ToolbarProps {
  format: Format;
  onFormat: (id: Format["id"]) => void;
  logoMode: LogoMode;
  onLogoMode: (mode: LogoMode) => void;
  showDate: boolean;
  onShowDate: (isOn: boolean) => void;
  category: Category | "all";
  onCategory: (category: Category | "all") => void;
  /** How many posts each category has, and all of them together. */
  counts: Record<Category, number>;
  total: number;
  /** An export is running: the settings can't change under it. */
  isBusy: boolean;
  onDownloadAll: () => void;
  /** Progress of the zip of all PNGs, 0 to 1, while it is being made. */
  zipProgress: number | null;
}

/**
 * The posts' settings and filter, kept in reach while scrolling.
 *
 * From `md` up: one row of settings (format, logo, date, and the zip of all
 * PNGs at the far end), then a row of category tabs. On a phone it is a
 * single short row instead, a category picker and a settings button, and the
 * settings open in a sheet from the bottom of the screen.
 */
export function Toolbar(props: ToolbarProps) {
  const t = useTranslations("Posts");
  const sheet = useRef<HTMLDialogElement>(null);
  const {
    format,
    onFormat,
    logoMode,
    onLogoMode,
    showDate,
    onShowDate,
    category,
    onCategory,
    counts,
    total,
    isBusy,
    onDownloadAll,
    zipProgress,
  } = props;

  const categories = (["all", ...CATEGORIES] as const).map((id) => ({
    id,
    count: id === "all" ? total : counts[id],
  }));

  const formatOptions = (isCompact: boolean) =>
    FORMATS.map((f) => ({
      id: f.id,
      content: (
        <>
          <FormatLogo id={f.id} />
          {f.label}
          {!isCompact && (
            <span className="hidden opacity-60 lg:inline">
              {Math.round(f.width * f.exportScale)}×
              {Math.round(f.height * f.exportScale)}
            </span>
          )}
        </>
      ),
    }));
  const logoOptions = (["full", "duck"] as const).map((mode) => ({
    id: mode,
    content: t(`logo_${mode}`),
  }));
  const downloadAll = (
    <button
      type="button"
      disabled={isBusy || !total}
      onClick={onDownloadAll}
      className={clsx(control, "hover:bg-[#ff5757] hover:text-black")}
    >
      ↓ {t("download_all")}
      {zipProgress !== null && ` · ${Math.round(zipProgress * 100)} %`}
    </button>
  );
  const dateToggle = (
    <Toggle
      label={t("logo_date")}
      isOn={showDate && logoMode !== "duck"}
      onChange={onShowDate}
      disabled={isBusy || logoMode === "duck"}
    />
  );

  return (
    // The background runs edge to edge; the lines keep to the page margins,
    // so they line up with the section dividers below.
    <div className="sticky top-0 z-30 -mx-4 mb-8 bg-[rgba(12,3,3,0.92)] px-4 backdrop-blur md:-mx-10 md:px-10">
      {/* Phone: pick a category, open the settings. */}
      <div className="flex items-center gap-2 border-y border-[rgba(255,87,87,0.25)] py-3 md:hidden">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">{t("show")}</span>
          <select
            value={category}
            onChange={(event) =>
              onCategory(event.target.value as Category | "all")
            }
            className={clsx(
              control,
              "w-full appearance-none justify-start bg-[#0c0303] pr-9 text-left text-base normal-case tracking-normal text-[#fafafa]",
            )}
          >
            {categories.map(({ id, count }) => (
              <option key={id} value={id} disabled={!count}>
                {`${t(`categories.${id}`)} (${count})`}
              </option>
            ))}
          </select>
          <IconChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#ff5757]"
          />
        </label>
        <button
          type="button"
          onClick={() => sheet.current?.showModal()}
          aria-label={t("settings")}
          className={clsx(control, "hover:bg-[rgba(255,87,87,0.15)]")}
        >
          <IconAdjustmentsHorizontal size={18} stroke={1.75} />
          {format.label}
        </button>
      </div>

      {/* Phone: the settings, in a sheet from the bottom. A click on the
          dimmed page behind it closes it. */}
      <dialog
        ref={sheet}
        aria-label={t("settings")}
        onClick={(event) => {
          if (event.target === event.currentTarget) sheet.current?.close();
        }}
        className="m-0 mt-auto w-full max-w-none border-t-2 border-[#ff5757] bg-[#0c0303] p-0 text-[#fafafa] backdrop:bg-[rgba(0,0,0,0.6)] md:hidden"
      >
        <div className="flex flex-col gap-5 px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-4">
          <div className="flex items-center justify-between">
            <p
              className={clsx(
                plexMono.className,
                "text-sm uppercase tracking-[0.14em]",
              )}
            >
              {t("settings")}
            </p>
            <button
              type="button"
              onClick={() => sheet.current?.close()}
              aria-label={t("close")}
              className="flex h-10 w-10 items-center justify-center text-[#ff5757]"
            >
              <IconX size={20} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <span className={caption}>{t("format")}</span>
            <Segmented
              label={t("format")}
              options={formatOptions(true)}
              value={format.id}
              onChange={onFormat}
              disabled={isBusy}
              stretch
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className={caption}>{t("logo")}</span>
            <div className="flex gap-2">
              <Segmented
                label={t("logo")}
                options={logoOptions}
                value={logoMode}
                onChange={onLogoMode}
                disabled={isBusy}
                stretch
              />
              {dateToggle}
            </div>
          </div>
          {downloadAll}
        </div>
      </dialog>

      {/* From `md` up: the settings, then the category tabs. */}
      <div className="hidden flex-col gap-3 border-y border-[rgba(255,87,87,0.25)] py-3 md:flex">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-3">
            <span className={caption}>{t("format")}</span>
            <Segmented
              label={t("format")}
              options={formatOptions(false)}
              value={format.id}
              onChange={onFormat}
              disabled={isBusy}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className={caption}>{t("logo")}</span>
            <Segmented
              label={t("logo")}
              options={logoOptions}
              value={logoMode}
              onChange={onLogoMode}
              disabled={isBusy}
            />
            {dateToggle}
          </div>
          <div className="ml-auto">{downloadAll}</div>
        </div>
        <div
          role="group"
          aria-label={t("show")}
          className="flex flex-wrap items-center gap-1"
        >
          <span className={clsx(caption, "mr-2")}>{t("show")}</span>
          {categories.map(({ id, count }) => (
            <button
              key={id}
              type="button"
              aria-pressed={id === category}
              disabled={!count}
              onClick={() => onCategory(id)}
              className={clsx(
                control,
                "border-transparent px-2.5",
                id === category
                  ? "bg-[#fafafa] text-black"
                  : "text-[#d3d2d2] hover:border-[rgba(250,250,250,0.3)] hover:text-white",
              )}
            >
              {t(`categories.${id}`)}
              <span className="opacity-60">{count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
