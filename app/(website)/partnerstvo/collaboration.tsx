import { Button } from "@/app/components/button";
import { Heading } from "@/app/components/heading";
import { PageWrapper } from "@/app/components/page-wrapper";
import { Paragraph } from "@/app/components/paragraph";
import Image from "next/image";

export function Collaboration() {
  return (
    <PageWrapper bgColor="bg-blue">
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        <div className="flex flex-col gap-6 basis-1/2 max-w-96">
          <Heading size="lg" className="text-left">
            {"Možnosti sodelovanja"}
          </Heading>
        </div>
        <div className="flex flex-col gap-4 basis-1/2">
          <div className="flex gap-2 items-center">
            <Image
              src="/assets/bullet.svg"
              width={36}
              height={36}
              alt="Bullet illustration"
              className="h-3 w-3"
            />
            <Paragraph size="lg" weight="bold">
              {"Predstavitev in sodelovanje pri oblikovanju vsebine dogodkov."}
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
              {"Objava zaposlitvenih oglasov na naših platformah."}
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
              {"Programerski dogodki in mreženje."}
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
              {"Deljenje promocijskega materiala na dogodkih."}
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
              {"Povečanje prepoznavnosti vaše blagovne znamke."}
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
              {"Druge oblike sodelovanja po dogovoru."}
            </Paragraph>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
