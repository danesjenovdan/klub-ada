import Image from "next/image";
import { Paragraph } from "./paragraph";

type InloneErrorProps = {
  label?: string;
};
export function InlineError({ label }: InloneErrorProps) {
  return (
    <div className="w-fit p-4 md:p-6 bg-white rounded-2xl border border-black flex gap-5 flex-col items-center text-center">
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
