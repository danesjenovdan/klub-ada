"use client";

import { Heading } from "@/app/components/heading";
import { PageWrapper } from "@/app/components/page-wrapper";
import { Paragraph } from "@/app/components/paragraph";
import Image from "next/image";

export function Mission() {
  /* Section Data */
  const sections = [
    {
      title: "Misija",
      text: "Navduševati ženske nad tehnologijo ter jim nuditi podporo in vire za razvoj veščin, mreženje ter rast na kariernem področju.",
      paragraph:
        "Naše aktivnosti so zasnovane tako, da ustvarjajo varno in spodbudno okolje, kjer lahko članice delijo ideje, izkušnje in se vključujejo v pogovore.",
      image: "/assets/mission.png",
    },
    {
      title: "Naša zgodba začetka",
      text: "Klub Ada je nastal iz želje po povezovanju žensk na področju, kjer smo pogosto v manjšini, kar prinaša edinstvene izzive in dileme.",
      paragraph:
        "Zaradi teh izkušenj se pogosto počutimo, kot da v ta prostor ne spadamo. Z našimi aktivnostmi želimo poudariti, da je tehnologija prostor, kjer smo dobrodošle in kjer je naš glas pomemben.",
      image: "/assets/beginning-story.png",
    },
    {
      title: "Od kje ime Klub Ada?",
      text: "Navdih za ime smo našli v pionirki računalništva Adi Lovelace – matematičarki, pisateljici in prvi programerki.",
      paragraph:
        "V 19. stoletju je za analitični stroj Charlesa Babbaga, predhodnika sodobnega računalnika, zapisala prvi algoritem. Ada Lovelace je dokaz, da so ženske že od začetka sooblikovale tehnologijo, njen vpliv pa nas navdihuje tudi danes, ko skupaj gradimo prihodnost.",
      image: "/assets/ada-name.png",
    },
  ];

  return (
    <PageWrapper hasNoBottomPadding hasNoTopPadding>
      <>
        {sections.map((section, index) => (
          <div key={index} className="flex h-screen w-full">
            <div className="w-1/2 h-full flex items-center justify-center">
              <Image
                src={section.image}
                alt={section.title}
                width={600}
                height={600}
                className="h-[60%] w-[100%] object-cover rounded-2xl border border-black"
              />
            </div>
            <div className="w-1/2 h-full flex flex-col justify-center px-20 gap-4">
              <Heading size="lg" color="red">
                {section.title}
              </Heading>
              <Paragraph size="lg" weight="bold">
                {section.text}
              </Paragraph>
              <Paragraph size="lg">{section.paragraph}</Paragraph>
            </div>
          </div>
        ))}
      </>
    </PageWrapper>
  );
}
