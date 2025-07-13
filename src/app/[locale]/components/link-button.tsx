import { Link as NextLink } from "../../../i18n/navigation";
import { forwardRef } from "react";
import { LinkOptions } from "./link";
import { baseButton, ButtonOptions } from "./button";
import { ForwardRefComponent, PropsOf } from "../../utils/polymorphic";
import { tv } from "tailwind-variants";
import { IconArrowRight } from "@tabler/icons-react";

const linkButtonBase = tv({
  extend: baseButton,
  variants: {
    variant: {
      primary:
        "bg-red border border-black text-white transition-all duration-200 ease-in-out transform hover:shadow-button hover:-translate-y-1 hover:translate-x-1",
      secondary:
        "bg-white border border-black text-black transition-all duration-200 ease-in-out transform hover:shadow-button hover:-translate-y-1 hover:translate-x-1",
    },
  },
});

type ButtonLinkComponent = ForwardRefComponent<
  "a",
  LinkOptions & Pick<ButtonOptions, "size" | "variant"> & { showIcon?: boolean }
>;
export type ButtonLinkProps = PropsOf<ButtonLinkComponent>;

export const LinkButton = forwardRef(
  (
    {
      children,
      href,
      isExternal = false,
      size = "md",
      variant = "primary",
      showIcon = false,
      ...restProps
    },
    forwardedRef
  ) => {
    const externalProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <NextLink
        ref={forwardedRef}
        href={href}
        className={`${linkButtonBase({ size, variant, disabled: false })} group`}
        {...externalProps}
        {...restProps}
      >
        {children}
        {showIcon && (
          <IconArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:-rotate-45" />
        )}
      </NextLink>
    );
  }
) as ButtonLinkComponent;
