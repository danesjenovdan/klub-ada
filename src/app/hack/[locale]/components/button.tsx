import { ElementType, forwardRef } from "react";
import { tv } from "tailwind-variants";
import clsx from "clsx";
import { ForwardRefComponent, PropsOf } from "@/src/app/utils/polymorphic";

/**
 * The hackathon's one button style: a solid red block with pixel-notched
 * corners that inverts to white with red text on hover, like a selected item
 * in an old menu. Shared by `Button` and
 * `LinkButton`, so a button looks the same whether it is a `<button>`, a
 * router link or a plain `<a>`.
 */
export const baseButton = tv({
  base: clsx(
    "pixel-corners inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap select-none outline-none",
    "bg-red text-white font-button font-medium",
    "transition-colors duration-150 ease-out",
  ),
  variants: {
    size: {
      sm: "text-sm h-8 px-4",
      md: "text-base md:text-lg h-9 md:h-11 px-4 md:px-5",
    },
    disabled: {
      // A disabled button keeps its look (the navbar shows "coming soon" in
      // one) but does not react to the pointer.
      true: "cursor-default",
      false:
        "cursor-pointer hover:bg-white hover:text-red focus-visible:bg-white focus-visible:text-red",
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
});

export interface ButtonOptions {
  /**
   * Sets the size of the button
   * @default 'md'
   */
  size?: "sm" | "md";
  /**
   * If `true` the button will be disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * The HTML `type` attribute (only meaningful when rendered as a `<button>`)
   * @default 'button'
   */
  type?: "button" | "submit" | "reset";
  /**
   * Icon to display after the button label
   */
  iconRight?: ElementType;
}

type PolymorphicButton = ForwardRefComponent<"button", ButtonOptions>;
export type ButtonProps = PropsOf<PolymorphicButton>;

/**
 * The hackathon button. Pass `as="a"` with an `href` to render it as a plain
 * anchor (for `mailto:` and other links the router should not touch); for
 * in-app links use `LinkButton`.
 */
export const Button = forwardRef(
  (
    {
      as: Component = "button",
      children,
      type = "button",
      size = "md",
      isDisabled = false,
      disabled: hasHtmlDisabledProp,
      iconRight: IconRight,
      className,
      ...rest
    },
    forwardedRef,
  ) => {
    const shouldBeDisabled = isDisabled || hasHtmlDisabledProp;
    const buttonProps =
      Component === "button"
        ? { type, disabled: shouldBeDisabled }
        : { "aria-disabled": shouldBeDisabled || undefined };

    return (
      <Component
        ref={forwardedRef}
        className={clsx(
          baseButton({ size, disabled: shouldBeDisabled }),
          className,
        )}
        {...buttonProps}
        {...rest}
      >
        {children}
        {IconRight && <IconRight className="w-4 h-4" />}
      </Component>
    );
  },
) as PolymorphicButton;
