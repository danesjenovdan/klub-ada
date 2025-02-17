import Image from "next/image";
import { Heading } from "../components/heading";
import { PageWrapper } from "../components/page-wrapper";

export function Logos() {
  const logos = [
    {
      id: "logo-1",
      src: "/assets/impact-hub-logo.webp",
      href: "https://ljubljana.impacthub.net/",
      alt: "Impact Hub Ljubljana logo",
    },
    {
      id: "logo-2",
      src: "/assets/celtra-logo.webp",
      href: "https://celtra.com/",
      alt: "Celtra logo",
    },
    {
      id: "logo-3",
      src: "/assets/teads-logo.webp",
      href: "https://www.teads.com/",
      alt: "Teads logo",
    },
    {
      id: "logo-4",
      src: "/assets/dewesoft-logo.svg",
      href: "https://dewesoft.com/",
      alt: "Dewesoft logo",
    },
    {
      id: "logo-5",
      src: "/assets/fri-logo.webp",
      href: "https://fri.uni-lj.si/sl",
      alt: "FRI logo",
    },
  ];

  return (
    <PageWrapper>
      <div className="flex flex-col items-center text-center gap-6 md:gap-12">
        <Heading size="xs">{"Podporniki & Partnerji"}</Heading>
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
                className="h-14 w-44 object-contain grayscale hover:grayscale-0 flex-shrink-0 hover:scale-105 duration-200"
              />
            </a>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
