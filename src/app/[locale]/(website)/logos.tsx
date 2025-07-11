import Image from "next/image";
import { Heading } from "@/src/app/[locale]/components/heading";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { useTranslations } from "next-intl";

export function Logos() {
  const t = useTranslations("Partners.logos");
  const logos = [
    {
      id: "logo-1",
      src: "/assets/logo-impact-hub-lj.svg",
      href: "https://ljubljana.impacthub.net/",
      alt: "Impact Hub Ljubljana logo",
    },
    {
      id: "logo-2",
      src: "/assets/logo-celtra.svg",
      href: "https://celtra.com/",
      alt: "Celtra logo",
    },
    {
      id: "logo-3",
      src: "/assets/logo-teads.svg",
      href: "https://www.teads.com/",
      alt: "Teads logo",
    },
    {
      id: "logo-4",
      src: "/assets/logo-dewesoft.svg",
      href: "https://dewesoft.com/",
      alt: "Dewesoft logo",
    },
    {
      id: "logo-5",
      src: "/assets/logo-fri.svg",
      href: "https://fri.uni-lj.si/sl",
      alt: "FRI logo",
    },
  ];

  return (
    <PageWrapper>
      <div className="flex flex-col items-center text-center gap-6 md:gap-12">
        <Heading size="xs">{t("title")}</Heading>
        <div className="grid grid-cols-3 lg:grid-cols-5 justify-between text-center items-center gap-8 lg:gap-20">
          {logos.map((logo) => (
            <a
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              key={logo.id}
            >
              <Image
                width={200}
                height={56}
                src={logo.src}
                alt={logo.alt}
                className="h-24 object-contain grayscale hover:grayscale-0 flex-shrink-0 hover:scale-105 duration-200"
              />
            </a>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
