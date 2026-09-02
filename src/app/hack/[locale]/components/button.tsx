import { ElementType, forwardRef } from "react";
import { tv } from "tailwind-variants";
import clsx from "clsx";
import { ForwardRefComponent, PropsOf } from "@/src/app/utils/polymorphic";

export const baseButton = tv({
  base: "inline-flex shrink-0 relative justify-center items-center gap-1.5 text-center whitespace-nowrap outline-none select-none font-heading uppercase text-sm md:text-base border-2 truncate",
  variants: {
    size: {
      sm: "text-sm h-8 py-1 px-4",
      md: "text-lg h-11 py-2 px-5",
    },
    variant: {
      primary:
        "hover:bg-red700 hover:text-black hover:border-t-red800 hover:border-l-red800 hover:border-r-red100 hover:border-b-red100 bg-red text-black border-t-red100 border-l-red100 border-r-red800 border-b-red800",
      secondary:
        "hover:bg-gray300 hover:text-black hover:border-t-gray900 hover:border-l-gray900 hover:border-r-gray100 hover:border-b-gray100 bg-gray200 text-black border-t-gray100 border-l-gray100 border-r-gray900 border-b-gray900",
    },
    disabled: {
      true: "cursor-not-allowed bg-gray300 border border-gray700 text-white",
    },
  },
});

export interface ButtonOptions {
  /**
   * Sets the size of the button
   * @default 'md'
   */
  size?: "sm" | "md";
  /**
   * Sets the style variant of the button
   * @default 'primary'
   */
  variant?: "primary" | "secondary";
  /**
   * If `true` the button will be disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * The HTML `type` attribute
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

export const Button = forwardRef(
  (
    {
      children,
      type = "button",
      size = "md",
      variant = "primary",
      isDisabled = false,
      disabled: hasHtmlDisabledProp,
      iconRight: IconRight,
      className,
      ...rest
    },
    forwardedRef,
  ) => {
    const shouldBeDisabled = isDisabled || hasHtmlDisabledProp;

    return (
      <button
        ref={forwardedRef}
        type={type}
        disabled={shouldBeDisabled}
        className={clsx(
          baseButton({
            size,
            variant,
            disabled: shouldBeDisabled,
          }),
          className,
        )}
        {...rest}
      >
        {children}
        {IconRight && <IconRight className="w-4 h-4" />}
      </button>
    );
  },
) as PolymorphicButton;
