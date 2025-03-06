import { Heading } from "@/app/components/heading";
import { LinkButton } from "@/app/components/link-button";
import { PageWrapper } from "@/app/components/page-wrapper";
import { Paragraph } from "@/app/components/paragraph";

export function BecomePartner() {
  return (
    <PageWrapper>
      <div className="flex p-8 md:p-16 lg:p-20 bg-blue grow rounded-2xl border border-black">
        <div className="flex flex-col gap-10 md:flex-row justify-between items-center w-full">
          <div className="flex flex-col gap-3 md:gap-6">
            <Heading size="lg">{"Vas zanima sodelovanje?"}</Heading>
            <Paragraph size="xl">
              {"Za več informacij nam lahko pišete na"}{" "}
              <a
                href="mailto:info@klub-ada.si"
                className="text-white font-medium"
              >
                info@klub-ada.si
              </a>
            </Paragraph>
          </div>
          <div className="flex justify-start md:justify-end w-full md:w-auto">
            <LinkButton
              size="md"
              variant="secondary"
              href="mailto:info@klub-ada.si"
              isExternal
              showIcon
            >
              {"Postani partner"}
            </LinkButton>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
