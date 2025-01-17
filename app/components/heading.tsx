import { forwardRef } from "react";
import { ForwardRefComponent, PropsOf } from "../utils/polymorphic";
import { tv } from "tailwind-variants";

const baseHeading = tv({
  base: "font-heading m-0 break-words",
  variants: {
    size: {
      xl: "text-4xl md:text-[44px] lg:text-[52px] font-bold tracking-tight",
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
    lineHeight: {
      tight: "leading-6",
      none: "leading-7",
      normal: "leading-[120%]",
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
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  /**
   * Sets the color of the heading
   * @default 'black'
   */

  color?: "black" | "white" | "pink" | "red";
  /**
   * Sets the line height of the paragraph
   * @default 'normal'
   */
  lineHeight?: "tight" | "none" | "normal";
  /**
   * Truncates the heading if true
   */
  shouldTruncate?: boolean;
  /**
   * Alignment of the heading
   * @default 'left'
   */
  textAlign?: "left" | "center" | "right";
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
      lineHeight = "normal",
      shouldTruncate,
      className,
      ...rest
    },
    forwardedRef
  ) => {
    const HeadingElement = size === "xl" ? "h1" : size === "lg" ? "h2" : "h3";
    return (
      <HeadingElement
        ref={forwardedRef}
        className={
          baseHeading({
            size,
            color,
            textAlign,
            lineHeight,
            truncate: shouldTruncate,
          }) + ` ${className}`
        }
        {...rest}
      >
        {children}
      </HeadingElement>
    );
  }
) as HeadingComponent;
