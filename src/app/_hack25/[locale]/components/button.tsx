import { ElementType, forwardRef } from "react";
import { tv } from "tailwind-variants";
import clsx from "clsx";
import { ForwardRefComponent, PropsOf } from "@/src/app/utils/polymorphic";

export const baseButton = tv({
  base: "inline-flex shrink-0 relative justify-center items-center gap-1.5 select-none rounded-lg font-button font-bold text-center whitespace-nowrap outline-none",
  variants: {
    size: {
      sm: "text-sm h-8 py-1 px-4",
      md: "text-lg h-11 py-2 px-5",
      lg: "text-lg h-14 py-3 px-6",
    },
    variant: {
      primary:
        "border border-red text-white text-start shadow-shineRed transition-all duration-200 ease-in-out transform hover:bg-red hover:shadow-shineStrongRed",
      secondary:
        "border border-white text-white text-start shadow-shineWhite transition-all duration-200 ease-in-out transform hover:bg-red hover:border-red hover:shadow-shineStrongRed",
      tertiary:
        "bg-black text-white text-start transition-all duration-200 ease-in-out transform hover:bg-red",
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
  size?: "sm" | "md" | "lg";
  /**
   * Sets the style variant of the button
   * @default 'primary'
   */
  variant?: "primary" | "secondary" | "tertiary";
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
    forwardedRef
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
          className
        )}
        {...rest}
      >
        {children}
        {IconRight && <IconRight className="w-4 h-4" />}
      </button>
    );
  }
) as PolymorphicButton;
