import { Link as NextLink } from "../../../../i18n/navigation";
import { ElementType, forwardRef } from "react";
import { LinkOptions } from "./link";
import { baseButton, ButtonOptions } from "./button";
import { tv } from "tailwind-variants";
import { IconArrowRight } from "@tabler/icons-react";
import { ForwardRefComponent, PropsOf } from "@/src/app/utils/polymorphic";

const linkButtonBase = tv({
  extend: baseButton,
  variants: {
    variant: {
      primary: "border border-red text-white text-start shadow-shineRed", // md:shadow-none transition-all duration-200 ease-in-out transform hover:shadow-hackButton",
      secondary: "border border-white text-white text-start shadow-shineWhite", // md:shadow-none transition-all duration-200 ease-in-out transform hover:shadow-hackButtonSecondary",
      tertiary: "bg-black text-white text-start",
    },
  },
});

type ButtonLinkComponent = ForwardRefComponent<
  "a",
  LinkOptions &
    Pick<ButtonOptions, "size" | "variant"> & {
      showIcon?: boolean;
      iconLeft?: ElementType;
    }
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
      iconLeft: IconLeft,
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
        {IconLeft && <IconLeft className="w-4 h-4" />}
        {children}
        {showIcon && (
          <IconArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:-rotate-45" />
        )}
      </NextLink>
    );
  }
) as ButtonLinkComponent;
