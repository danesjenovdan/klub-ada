import { Link as NextLink } from "../../../../i18n/navigation";
import { ElementType, forwardRef } from "react";
import clsx from "clsx";
import { IconArrowRight } from "@tabler/icons-react";
import { LinkOptions } from "./link";
import { baseButton, ButtonOptions } from "./button";
import { ForwardRefComponent, PropsOf } from "@/src/app/utils/polymorphic";

type ButtonLinkComponent = ForwardRefComponent<
  "a",
  Pick<LinkOptions, "href" | "isExternal"> &
    Pick<ButtonOptions, "size"> & {
      showIcon?: boolean;
      iconLeft?: ElementType;
    }
>;
export type ButtonLinkProps = PropsOf<ButtonLinkComponent>;

/**
 * An in-app link dressed as the hackathon button (see `Button`). It goes
 * through the locale-aware router link, so the locale prefix is kept.
 */
export const LinkButton = forwardRef(
  (
    {
      children,
      href,
      isExternal = false,
      size = "md",
      showIcon = false,
      iconLeft: IconLeft,
      className,
      ...restProps
    },
    forwardedRef,
  ) => {
    const externalProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <NextLink
        ref={forwardedRef}
        href={href}
        className={clsx(baseButton({ size }), "group", className)}
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
  },
) as ButtonLinkComponent;
