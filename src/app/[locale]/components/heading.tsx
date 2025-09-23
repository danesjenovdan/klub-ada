import { forwardRef } from "react";
import { ForwardRefComponent, PropsOf } from "../../utils/polymorphic";
import { tv } from "tailwind-variants";
import clsx from "clsx";

const baseHeading = tv({
  base: "font-heading m-0 break-words select-none",
  variants: {
    size: {
      lg: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
      md: "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight",
      sm: "text-2xl md:text-[28px] lg:text-[32px] font-bold tracking-tight",
      xs: "text-xl lg:text-2xl lg:leading-7 font-bold tracking-tight",
    },
    textAlign: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },

    color: {
      black: "text-black",
      white: "text-white",
      pink: "text-pink",
      red: "text-red",
    },
    truncate: {
      true: "truncate",
    },
  },
});

interface HeadingOptions {
  /**
   * Sets the visual size of the heading.
   *
   * @default 'lg'
   */
  size?: "lg" | "md" | "sm" | "xs";
  /**
   * Sets the color of the heading
   * @default 'black'
   */

  color?: "black" | "white" | "pink" | "red";

  /**
   * Truncates the heading if true
   */
  shouldTruncate?: boolean;
  /**
   * Alignment of the heading
   * @default 'left'
   */
  textAlign?: "left" | "center" | "right";
  isSpan?: boolean;
}

type HeadingComponent = ForwardRefComponent<"h2", HeadingOptions>;
export type HeadingProps = PropsOf<HeadingComponent>;

export const Heading = forwardRef(
  (
    {
      as,
      children,
      size = "lg",
      color = "black",
      textAlign = "left",
      shouldTruncate,
      className,
      isSpan = false,
      ...rest
    },
    forwardedRef
  ) => {
    const HeadingElement = isSpan
      ? "span"
      : size === "lg"
        ? "h1"
        : size === "md"
          ? "h2"
          : "h3";
    return (
      <HeadingElement
        ref={forwardedRef}
        className={clsx(
          baseHeading({
            size,
            color,
            textAlign,
            truncate: shouldTruncate,
          }),
          className
        )}
        {...rest}
      >
        {children}
      </HeadingElement>
    );
  }
) as HeadingComponent;
