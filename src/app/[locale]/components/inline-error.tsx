import Image from "next/image";
import { Paragraph } from "./paragraph";
import clsx from "clsx";

type InloneErrorProps = {
  label?: string;
  hasBox?: boolean;
};
export function InlineError({ label, hasBox = false }: InloneErrorProps) {
  return (
    <div
      className={clsx(
        "w-fit p-4 md:p-6 rounded-2xl flex gap-5 flex-col items-center text-center",
        hasBox ? "border border-black bg-white" : ""
      )}
    >
      <Image
        src="/assets/error.svg"
        width={176}
        height={128}
        alt="Error illustration"
        className="w-[176px]"
      />
      <Paragraph size="lg" className="text-center max-w-[332px]">
        {label || "Nekaj je šlo narobe. Prosim poskusi kasneje."}
      </Paragraph>
    </div>
  );
}
