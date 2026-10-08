import clsx from "clsx";
import { raised } from "./bevel";
import { LanguageSwitch } from "./language-switch";

/**
 * The desktop's system tray in the bottom-right corner, where Windows keeps
 * its input-language indicator. It holds the language switch, which keeps it
 * out of the navbar and away from the tickets button. It sits above the
 * windows, like a real tray. Phones have no room for it, so there the switch
 * stays in the navbar.
 */
export function Tray() {
  return (
    <div
      className={clsx(
        "hidden md:flex absolute z-30 right-3 bottom-3 items-center px-1.5 bg-gray200 shadow-[4px_4px_0_rgba(0,0,0,0.6)]",
        raised,
      )}
    >
      <LanguageSwitch />
    </div>
  );
}
