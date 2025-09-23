import { forwardRef } from "react";
import { ForwardRefComponent, PropsOf } from "../../utils/polymorphic";
import { tv } from "tailwind-variants";
import clsx from "clsx";

const baseParagraph = tv({
  base: "font-paragraph m-0 break-words text-wrap select-none",
  variants: {
    size: {
      xs: "text-[10px] md:text-xs",
      sm: "text-xs md:text-sm",
      md: "text-sm md:text-base",
      lg: "text-base md:text-lg",
      xl: "text-lg md:text-[22px]",
      xxl: "text-2xl md:text-3xl",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semiBold: "font-semibold",
      bold: "font-bold",
      extraBold: "font-extrabold",
    },
    textAlign: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    color: {
      black: "text-black",
      white: "text-white",
      gray: "text-gray300",
      lightGray: "text-gray500",
      pink: "text-pink",
      blue: "text-blue",
      red: "text-red",
    },
    truncate: {
      true: "truncate",
    },
  },
});

interface ParagraphOptions {
  /**
   * Sets the visual size of the paragraph.
   *
   * @default 'md'
   */
  size?: "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
  /**
   * Sets the font weight of the paragraph.
   *
   * @default 'medium'
   */
  weight?: "regular" | "medium" | "semiBold" | "bold" | "extraBold";
  /**
   * Sets the line hight of the paragraph
   * @default 'black'
   */
  color?: "black" | "white" | "gray" | "lightGray" | "pink" | "blue" | "red";
  /**
   * Truncates the paragraph if true
   */
  shouldTruncate?: boolean;
  /**
   * Alignment of the paragraph
   * @default 'left'
   */
  textAlign?: "left" | "center" | "right";
}

type ParagraphComponent = ForwardRefComponent<"p", ParagraphOptions>;
export type ParagraphProps = PropsOf<ParagraphComponent>;

export const Paragraph = forwardRef(
  (
    {
      as,
      children,
      size = "md",
      color = "black",
      textAlign = "left",
      weight = "medium",
      shouldTruncate,
      className,
      ...rest
    },
    forwardedRef
  ) => {
    return (
      <p
        ref={forwardedRef}
        className={clsx(
          baseParagraph({
            size,
            color,
            weight,
            textAlign,
            truncate: shouldTruncate,
          }),
          className
        )}
        {...rest}
      >
        {children}
      </p>
    );
  }
) as ParagraphComponent;
