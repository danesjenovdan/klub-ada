import { Button } from "@/src/app/components/button";
import { Heading } from "@/src/app/components/heading";
import { PageWrapper } from "@/src/app/components/page-wrapper";
import { Paragraph } from "@/src/app/components/paragraph";
import Image from "next/image";

export function WhyPartner() {
  return (
    <PageWrapper bgColor="bg-blue">
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        <div className="flex flex-col gap-6 basis-1/2">
          <Heading size="lg" className="text-left max-w-96">
            {"Zakaj postati partner?"}
          </Heading>
        </div>
        <div className="flex flex-col gap-6 basis-1/2">
          <Paragraph size="lg">
            {
              "Verjamemo, da je povezovanje ključ do rasti in uspeha. Naša prizadevanja za spodbujanje žensk v tehnologiji se ne bi mogla uresničiti brez podpore partnerjev, ki delijo naše vrednote in vizijo."
            }
          </Paragraph>
          <Paragraph size="lg">
            {
              "Naša misija je ustvariti vključujoče okolje za ženske, ki delujejo v tehnologiji z organizacijo dogodkov v živo, programerskih uric, knjižnega kluba, izobraževalnih vsebin, mentorstva, Discord skupnosti, in se več."
            }
          </Paragraph>
          <div className="flex flex-col gap-4">
            <Paragraph size="lg" weight="bold">
              {"S partnerstvom lahko pridobite naslednje:"}
            </Paragraph>
            <div className="flex gap-2 items-center">
              <Image
                src="/assets/bullet.svg"
                width={36}
                height={36}
                alt="Bullet illustration"
                className="h-3 w-3"
              />
              <Paragraph size="lg" weight="bold">
                {"Povečana prepoznavnost vašega podjetja."}
              </Paragraph>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src="/assets/bullet.svg"
                width={36}
                height={36}
                alt="Bullet illustration"
                className="h-3 w-3"
              />
              <Paragraph size="lg" weight="bold">
                {"Dostop do vrhunskega talenta."}
              </Paragraph>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src="/assets/bullet.svg"
                width={36}
                height={36}
                alt="Bullet illustration"
                className="h-3 w-3"
              />
              <Paragraph size="lg" weight="bold">
                {"Ustvarjanje pozitivnega vpliva na družbo."}
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
