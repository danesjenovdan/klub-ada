import { Link as NextLink } from "../../../i18n/navigation";
import { ForwardRefComponent, PropsOf } from "../../utils/polymorphic";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

export const linkBase = tv({
  variants: {
    variant: {
      primary:
        "text-sm font-medium text-black select-none outline-none whitespace-nowrap",
      secondary:
        "text-md font-medium text-black select-none outline-none whitespace-nowrap",
      tertiary:
        "text-lg font-medium text-black select-none outline-none whitespace-nowrap",
    },
  },
});

export interface LinkOptions {
  /**
   * The URL to link to.
   */
  href: string;
  /**
   * If `true`, the link will open in new tab
   */
  isExternal?: boolean;
  /**
   * Sets the style variant of the link element
   * @default 'primary'
   */
  variant?: "primary" | "secondary" | "tertiary";
}

type LinkComponent = ForwardRefComponent<"a", LinkOptions>;
export type LinkProps = PropsOf<LinkComponent>;

export const Link = forwardRef(
  (
    { children, href, isExternal = false, variant = "primary", ...restProps },
    forwardedRef
  ) => {
    const externalProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <NextLink
        ref={forwardedRef}
        href={href}
        className={`${linkBase({ variant })} underline-animation group-hover:after:w-full`}
        {...externalProps}
        {...restProps}
      >
        {children}
      </NextLink>
    );
  }
) as LinkComponent;
