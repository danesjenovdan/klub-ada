import Image from "next/image";
import { Heading } from "../components/heading";
import { PageWrapper } from "../components/page-wrapper";

export function Logos() {
  const logos = [
    {
      id: "logo-1",
      src: "/assets/celtra-logo.png",
      href: "https://celtra.com/",
      alt: "Celtra logo",
    },
    {
      id: "logo-2",
      src: "/assets/impact-hub-logo.png",
      href: "https://ljubljana.impacthub.net/",
      alt: "Impact Hub Ljubljana logo",
    },
    {
      id: "logo-3",
      src: "/assets/FRI-logo.png",
      href: "https://fri.uni-lj.si/sl",
      alt: "FRI logo",
    },
  ];

  return (
    <PageWrapper>
      <div className="flex flex-col items-center text-center gap-6 md:gap-12">
        <Heading size="xs">{"Podporniki & Partnerji"}</Heading>
        <div className="flex justify-between items-center gap-8 md:gap-28">
          {logos.map((logo) => (
            <a
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              key={logo.id}
            >
              <Image
                width={300}
                height={300}
                src={logo.src}
                alt={logo.alt}
                className="h-14 w-full object-contain grayscale hover:grayscale-0 flex-shrink-0"
              />
            </a>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
