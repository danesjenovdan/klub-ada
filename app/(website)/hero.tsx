import Image from "next/image";
import { Card } from "../components/card";
import { Heading } from "../components/heading";
import { PageWrapper } from "../components/page-wrapper";
import { Paragraph } from "../components/paragraph";
import { CtaLink } from "../components/cta-link";

export function Hero() {
  return (
    <PageWrapper hasNoTopPadding hasNoBottomPadding>
      <div className="flex flex-col gap-4 md:flex-row pt-4">
        <div className="flex flex-col gap-4 shrink-1 basis-1/2 lg:basis-2/5">
          <Card bgColor="bg-white">
            <div className="flex flex-col h-full justify-between gap-8">
              <Heading size="lg">{"Skupnost žensk v tehnologiji"}</Heading>
              <Paragraph size="lg">
                {
                  "Klub Ada organizira dogodke, ki so namenjeni mreženju in deljenju znanja, kariernega in osebnega razvoja za dijakinje, študentke, zaposlene in vse, ki jih področje tehnologije zanima."
                }
              </Paragraph>
            </div>
          </Card>
          <div className="block md:hidden">
            <Image
              src="/assets/hero.webp"
              width={768}
              height={150}
              alt="Hero picture"
              className="rounded-2xl max-h-52 object-cover"
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className="basis-1/2">
              <CtaLink label="Pridi na dogodek" color="red" href="/dogodki" />
            </div>
            <div className="basis-1/2">
              <CtaLink
                label="Postani partner"
                color="blue"
                href="/partnerstvo"
              />
            </div>
          </div>
        </div>
        <div className="hidden md:block grow basis-1/2 lg:basis-3/5">
          <Image
            src="/assets/hero.webp"
            width={865}
            height={500}
            alt="Hero picture"
            className="rounded-2xl w-full h-full object-cover"
          />
        </div>
      </div>
    </PageWrapper>
  );
}
