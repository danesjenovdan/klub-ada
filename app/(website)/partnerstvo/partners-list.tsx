import { Heading } from "@/app/components/heading";
import { PageWrapper } from "@/app/components/page-wrapper";
import { Paragraph } from "@/app/components/paragraph";
import Image from "next/image";

export function PartnersList() {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-14 md:gap-28">
        {/* Gold Partners */}
        <div className="flex flex-col gap-5 md:gap-10 items-center justify-center">
          <Paragraph size="xl">Zlati partnerji</Paragraph>
          <div className="flex flex-wrap gap-16">
            <Image
              src="/assets/logo-default.png"
              alt="Default logo"
              width={200}
              height={50}
              className="max-h-20 object-contain"
            />
            <Image
              src="/assets/logo-default.png"
              alt="Default logo"
              width={200}
              height={50}
              className="max-h-20 object-contain"
            />
          </div>
        </div>

        {/* Silver Partners */}
        <div className="flex flex-col gap-5 md:gap-10 items-center justify-center">
          <Paragraph size="xl">Srebrni partnerji</Paragraph>
          <div className="flex flex-wrap gap-16">
            <Image
              src="/assets/celtra-logo.png"
              alt="Default logo"
              width={180}
              height={80}
              className="max-h-20 object-contain"
            />
            <Image
              src="/assets/celtra-logo.png"
              alt="Default logo"
              width={180}
              height={80}
              className="max-h-20 object-contain"
            />
          </div>
        </div>

        {/* Project Partners */}
        <div className="flex flex-col gap-5 md:gap-10 items-center justify-center">
          <Paragraph size="xl">Projektni partnerji</Paragraph>
          <div className="flex flex-wrap gap-16">
            <Image
              src="/assets/impact-hub-logo.png"
              alt="Default logo"
              width={220}
              height={50}
              className="max-h-20 object-contain"
            />
            <Image
              src="/assets/fri-logo.png"
              alt="Default logo"
              width={220}
              height={50}
              className="max-h-20 object-contain"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
