import Image from "next/image";
import { Heading } from "../components/heading";
import { PageWrapper } from "../components/page-wrapper";
import { Paragraph } from "../components/paragraph";
import { LinkButton } from "../components/link-button";
import { Card } from "../components/card";
import discordImage from "../../public/assets/discord-image.webp";

export function Discord() {
  return (
    <PageWrapper>
      <>
        <Card bgColor="bg-yellow">
          <div className="flex flex-col-reverse lg:flex-row items-left lg:items-center justify-start gap-5 md:gap-10">
            <div className="h-full lg:basis-3/5">
              <Image
                src={discordImage}
                width={800}
                height={800}
                alt="Discord Image"
                className="w-full max-h-4/5 object-cover rounded-2xl"
                placeholder="blur"
              />
            </div>
            <div className="flex flex-col justify-start gap-4 grow basis-2/5">
              <Image
                src="/assets/discord-icon.svg"
                width={50}
                height={50}
                alt="Discord Icon"
                className="object-cover"
              />
              <Heading size="sm" className="max-w-72">
                {"Pridruži se naši skupnosti"}
              </Heading>

              <Paragraph size="lg" className="max-w-md">
                {
                  "Naša Discord platforma je varen prostor za izmenjavo idej, zanimivih tem, dogodkov, uporabnih virov in priložnosti za osebni in karierni razvoj."
                }
              </Paragraph>
              <div>
                <LinkButton
                  size="md"
                  variant="secondary"
                  href={"https://forms.gle/camdd2joyHi9kAZt5"}
                  isExternal
                  showIcon
                >
                  Pridruži se nam
                </LinkButton>
              </div>
            </div>
          </div>
        </Card>
      </>
    </PageWrapper>
  );
}
