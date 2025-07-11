import { Heading } from "@/src/app/components/heading";
import { LinkButton } from "@/src/app/components/link-button";
import { PageWrapper } from "@/src/app/components/page-wrapper";
import Image from "next/image";
import team from "../../../../public/assets/team.webp";

export function Hero() {
  return (
    <PageWrapper>
      <div className="flex flex-col pb-10 md:pb-20 md:px-16 gap-6 items-center">
        <div className="flex flex-col gap-2 items-center">
          <Image
            src="/assets/computer-illustration.svg"
            width={100}
            height={100}
            alt="Computer illustration"
            className="w-[80px] md:w-[120px] lg:w-[160]"
          />
          <Heading size="lg" className="text-center max-w-4xl">
            {
              "Navdušujemo ženske nad tehnologijo in jih podpiramo na karierni poti."
            }
          </Heading>
        </div>
        <div className="">
          <LinkButton size="md" variant="secondary" href="#team">
            {"Spoznaj ekipo"}
          </LinkButton>
        </div>
      </div>
      <div>
        <Image
          src={team}
          width={1500}
          height={672}
          placeholder="blur"
          alt="Klub Ada Team image"
          priority
          className="w-full object-cover bg-top object-[50%_10%] max-h-[42rem] rounded-2xl border border-black"
        />
      </div>
    </PageWrapper>
  );
}
