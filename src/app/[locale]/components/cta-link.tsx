import { forwardRef } from "react";
import { ForwardRefComponent, PropsOf } from "../../utils/polymorphic";
import { tv } from "tailwind-variants";
import { Paragraph } from "./paragraph";
import { Link as NextLink } from "../../../i18n/navigation";
import { IconArrowRight } from "@tabler/icons-react";

const baseCtaLink = tv({
  base: "flex flex-col grow p-4 lg:p-6 gap-4 md:gap-6 justify-between min-h-32 md:min-h-40 h-full select-none rounded-2xl font-button font-medium outline-none border border-black hover:shadow-button text-start transition-all duration-200 ease-in-out transform hover:shadow-button hover:-translate-y-1 hover:translate-x-1",
  variants: {
    color: {
      red: "bg-red",
      blue: "bg-blue",
      yellow: "bg-yellow",
      beige: "bg-beige",
      pink: "bg-pink",
    },
  },
});

interface CtaLinkOptions {
  /**
   * The color of the cta link
   * @default 'red'
   */
  color?: "red" | "blue" | "yellow" | "beige" | "pink";
  /**
   * Label to display on the cta link
   */
  label: string;
  /**
   * Description
   */
  description?: string;
  /**
   * The URL to link to.
   */
  href: string;
  /**
   * If `true`, the link will open in new tab
   */
  isExternal?: boolean;
}

type CtaLinkComponent = ForwardRefComponent<"a", CtaLinkOptions>;
export type CtaLinkProps = PropsOf<CtaLinkComponent>;

export const CtaLink = forwardRef(
  (
    { color = "red", label, description, href, isExternal = false, ...rest },
    forwardedRef
  ) => {
    const externalProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <NextLink
        ref={forwardedRef}
        href={href}
        {...externalProps}
        className={`${baseCtaLink({ color })} group`}
        {...rest}
      >
        <div className="max-w-[95%] lg:max-w-[50%] min-w-[100px]">
          <Paragraph size="xl" weight="bold">
            {label}
          </Paragraph>
        </div>
        <div className="flex justify-between">
          <Paragraph size="md" weight="medium" className="mr-6">
            {description}
          </Paragraph>
          <div className="self-end border border-black rounded-lg p-2 md:p-3">
            <IconArrowRight className="w-4 h-4 text-black transform transition-transform duration-300 group-hover:-rotate-45" />
          </div>
        </div>
      </NextLink>
    );
  }
) as CtaLinkComponent;
