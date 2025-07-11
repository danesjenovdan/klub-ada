import Image from "next/image";
import { PageWrapper } from "@/src/app/components/page-wrapper";
import { LinkButton } from "@/src/app/components/link-button";
import { Navbar } from "@/src/app/components/navbar";
import { Footer } from "@/src/app/components/footer";
import { Paragraph } from "@/src/app/components/paragraph";

export default function NotFound() {
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
            {"O ne! Stran ni bila najdena."}
          </Paragraph>
          <LinkButton href="/">{"Nazaj na glavno stran"}</LinkButton>
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
}
