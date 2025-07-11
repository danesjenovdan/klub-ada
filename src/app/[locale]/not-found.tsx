import Image from "next/image";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { LinkButton } from "@/src/app/[locale]/components/link-button";
import { Navbar } from "@/src/app/[locale]/components/navbar";
import { Footer } from "@/src/app/[locale]/components/footer";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="flex flex-col w-full h-[calc(100vh-200px)] items-center justify-center gap-6 md:gap-10">
          <Image
            src="/assets/404.svg"
            width={457}
            height={332}
            alt="Not found illustration"
            className="w-full max-w-[457px]"
          />
          <Paragraph size="xl" weight="bold" className="text-center">
            {t("description")}
          </Paragraph>
          <LinkButton href="/">{t("back_button")}</LinkButton>
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
}
