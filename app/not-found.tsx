import Image from "next/image";
import { PageWrapper } from "./components/page-wrapper";
import { Heading } from "./components/heading";
import { LinkButton } from "./components/link-button";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="flex flex-col w-full h-[calc(100vh-200px)] items-center justify-center gap-8">
          <Image
            src="/assets/404.svg"
            width={457}
            height={332}
            alt="Not found illustration"
            className="w-full max-w-[457px]"
          />
          <Heading className="text-center">
            {"O ne! Stran ni bila najdena."}
          </Heading>
          <LinkButton href="/">{"Nazaj na glavno stran"}</LinkButton>
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
}
