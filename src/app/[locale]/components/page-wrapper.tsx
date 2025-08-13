import clsx from "clsx";

type PageWrapperProps = {
  children: string | JSX.Element | JSX.Element[];
  bgColor?:
    | "bg-white"
    | "bg-beige"
    | "bg-red"
    | "bg-blue"
    | "bg-pink"
    | "bg-black";
  hasNoTopPadding?: boolean;
  hasNoBottomPadding?: boolean;
};

export function PageWrapper({
  children,
  bgColor = "bg-beige",
  hasNoTopPadding = false,
  hasNoBottomPadding = false,
}: PageWrapperProps) {
  return (
    <section
      className={clsx(`px-5 md:px-20 ${bgColor} box-border max-w-full`, {
        "pt-10 md:pt-20": !hasNoTopPadding,
        "pb-10 md:pb-20": !hasNoBottomPadding,
      })}
    >
      {children}
    </section>
  );
}
