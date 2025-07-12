import { Heading } from "@/src/app/[locale]/components/heading";
import { LinkButton } from "@/src/app/[locale]/components/link-button";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import Image from "next/image";
import partners from "../../../../../public/assets/partners-image.webp";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Partners");
  return (
    <PageWrapper>
      <div className="flex flex-col pb-4 md:pb-14 md:px-16 gap-6 items-center">
        <div className="flex flex-col gap-2 items-center">
          <Image
            src="/assets/partners-illustration.svg"
            priority
            width={100}
            height={100}
            alt="Partners illustration"
            className="w-[80px] md:w-[120px] lg:w-[160]"
          />
          <Heading size="lg" className="text-center">
            {t("title")}
          </Heading>
        </div>
        <Paragraph size="lg" className="max-w-2xl text-center">
          {t("description")}
        </Paragraph>
        <div className="">
          <LinkButton size="md" variant="secondary" href="#become-partner">
            {t("cta")}
          </LinkButton>
        </div>
      </div>
      <div>
        <Image
          src={partners}
          priority
          placeholder="blur"
          width={1500}
          height={672}
          alt="Hero image"
          className="w-full object-cover max-h-[42rem] rounded-2xl border border-black my-6"
        />
      </div>
    </PageWrapper>
  );
}
