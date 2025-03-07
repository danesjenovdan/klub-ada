import Image from "next/image";
import { CtaLink } from "./cta-link";
import { Heading } from "./heading";
import { PageWrapper } from "./page-wrapper";
import { Paragraph } from "./paragraph";
import { Link } from "./link";
import { Card } from "./card";
import FooterNewsletter from "./footer-newsletter";

export function Footer() {
  return (
    <PageWrapper hasNoBottomPadding hasNoTopPadding bgColor="bg-white">
      <div className="flex flex-col pt-10 md:pt-20">
        <div className="flex flex-col pt-8 px-7 md:pt-16 md:px-14 bg-beige rounded-t-2xl">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <Heading size="sm" className="max-w-80">
              {"Skupnost žensk v tehnologiji"}
            </Heading>
            <div className="flex flex-col grow max-w-3xl gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="basis-8/12">
                  <CtaLink
                    label="Pridruži se Discord skupini"
                    color="yellow"
                    description="Varen prostor za izmenjavo idej, dogodkov, zaposlitev in priložnosti za osebni in karierni razvoj."
                    href="https://forms.gle/iRmFfg7Amn3YchM2A"
                    isExternal
                  />
                </div>
                <div className="basis-4/12">
                  <CtaLink
                    label="Postani partner"
                    color="blue"
                    href="/partnerstvo"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="basis-4/12">
                  <CtaLink
                    label="Pridi na dogodek"
                    color="red"
                    href="/dogodki"
                  />
                </div>
                <div className="basis-8/12">
                  <Card>
                    <div className="flex flex-col gap-4">
                      <Paragraph size="xl" weight="bold">
                        Prijavi se na novičnik
                      </Paragraph>
                      <FooterNewsletter />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-10 md:flex-row px-7 py-16 md:px-14 bg-beige justify-between">
          <div className="flex flex-col gap-4">
            <a href="/" rel="noopener noreferrer">
              <Image
                src="/assets/klub-ada-logo.svg"
                width={80}
                height={50}
                alt="Klub Ada logo"
              />
            </a>
            <Paragraph size="sm">{"info@klub-ada.si"}</Paragraph>
          </div>
          <div className="flex flex-col md:flex-row gap-10 lg:gap-24">
            <div className="flex flex-col gap-2">
              <Paragraph size="lg" weight="bold">
                {"O nas"}
              </Paragraph>
              <div className="flex flex-col gap-2">
                <div>
                  <Link variant="secondary" href="/o-nas">
                    {"Spoznaj Klub Ada"}
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Paragraph size="lg" weight="bold">
                {"Aktivnosti"}
              </Paragraph>
              <div className="flex flex-col gap-2">
                <div>
                  <Link variant="secondary" href="/dogodki">
                    {"Dogodki"}
                  </Link>
                </div>
                <div>
                  <Link variant="secondary" href="/blog">
                    {"Blog"}
                  </Link>
                </div>
                <div>
                  <Link variant="secondary" href="/partnerstvo">
                    {"Partnerstva"}
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Paragraph size="lg" weight="bold">
                {"Pridruži se nam"}
              </Paragraph>
              <div className="flex flex-col gap-2">
                <div>
                  <Link
                    variant="secondary"
                    href="https://forms.gle/camdd2joyHi9kAZt5"
                    isExternal
                  >
                    {"Discord"}
                  </Link>
                </div>
                <div>
                  <Link
                    variant="secondary"
                    href="https://www.linkedin.com/company/klub-ada/posts/"
                    isExternal
                  >
                    {"LinkedIn"}
                  </Link>
                </div>
                <div>
                  <Link
                    variant="secondary"
                    href="https://www.instagram.com/klub_ada/"
                    isExternal
                  >
                    {"Instagram"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
