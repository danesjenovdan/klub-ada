"use client";

import { Heading } from "@/src/app/components/heading";
import { PageWrapper } from "@/src/app/components/page-wrapper";
import { Paragraph } from "@/src/app/components/paragraph";
import Image from "next/image";
import { motion } from "framer-motion";
import mission from "../../../../../public/assets/mission.webp";
import ada from "../../../../../public/assets/ada-lovelace.webp";
import beginning from "../../../../../public/assets/beginning-story.webp";

export function Mission() {
  const textVariants = {
    hidden: { x: 50, opacity: 0 }, // Start off-screen (to the right)
    visible: {
      x: 0, // End at the original position
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }, // Smooth transition
    },
  };

  return (
    <PageWrapper hasNoTopPadding>
      <div className="flex">
        <div className="hidden md:block min-w-24 relative"></div>
        <div className="border border-black border-l-[1px] border-t-[1px] border-b-[1px] border-r-[1px] bg-white rounded-2xl">
          {/* Section 1*/}
          <div className="flex flex-col md:flex-row md:h-[90vh] w-full">
            <div className="flex w-full md:w-1/2 h-full items-center justify-center md:ml-[-96px] p-4 md:p-0">
              <Image
                src={mission}
                placeholder="blur"
                alt="Alt text"
                width={700}
                height={700}
                className="aspect-square object-cover rounded-2xl border border-black transition-all duration-200 ease-in-out transform hover:shadow-yellow hover:-translate-y-1 hover:translate-x-1"
              />
            </div>
            <motion.div
              className="w-full md:w-1/2 h-full flex flex-col justify-center p-4 md:px-20 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }} // Trigger animation when 50% of the div is in view
              variants={textVariants}
            >
              <Heading size="lg" color="red">
                {"Misija"}
              </Heading>
              <Paragraph size="lg" weight="bold">
                {
                  "Navduševati ženske nad tehnologijo ter jim nuditi podporo in vire za razvoj veščin, mreženje ter rast na kariernem področju."
                }
              </Paragraph>
              <Paragraph size="lg">
                {
                  "Naše aktivnosti so zasnovane tako, da ustvarjajo varno in spodbudno okolje, kjer lahko udeleženke delijo ideje, izkušnje in se vključujejo v pogovore."
                }
              </Paragraph>
            </motion.div>
          </div>

          {/* Section 2*/}
          <div className="flex flex-col md:flex-row md:h-[90vh] w-full">
            <div className="flex w-full md:w-1/2 h-full items-center justify-center md:ml-[-96px] p-4 md:p-0">
              <Image
                src={beginning}
                placeholder="blur"
                alt="Alt text"
                width={700}
                height={700}
                className="aspect-square object-cover rounded-2xl border border-black transition-all duration-200 ease-in-out transform hover:shadow-blue hover:-translate-y-1 hover:translate-x-1"
              />
            </div>
            <motion.div
              className="w-full md:w-1/2 h-full flex flex-col justify-center p-4 md:px-20 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }} // Trigger animation when 50% of the div is in view
              variants={textVariants}
            >
              <Heading size="lg" color="red">
                {"Zgodba o našem začetku"}
              </Heading>
              <Paragraph size="lg" weight="bold">
                {
                  "Klub Ada je nastal iz želje po povezovanju žensk na področju, kjer smo pogosto v manjšini, kar prinaša edinstvene izzive in dileme."
                }
              </Paragraph>
              <Paragraph size="lg">
                {
                  "Zaradi teh izkušenj se pogosto počutimo, kot da v ta prostor ne spadamo. Z našimi aktivnostmi želimo poudariti, da je tehnologija prostor, kjer smo dobrodošle in kjer je naš glas pomemben."
                }
              </Paragraph>
            </motion.div>
          </div>

          {/* Section 3*/}
          <div className="flex flex-col md:flex-row md:h-[90vh] w-full">
            <div className="flex w-full md:w-1/2 h-full items-center justify-center md:ml-[-96px] p-4 md:p-0">
              <Image
                src={ada}
                placeholder="blur"
                alt="Alt text"
                width={700}
                height={700}
                className="aspect-square object-cover rounded-2xl border border-black transition-all duration-200 ease-in-out transform hover:shadow-pink hover:-translate-y-1 hover:translate-x-1"
              />
            </div>
            <motion.div
              className="w-full md:w-1/2 h-full flex flex-col justify-center p-4 md:px-20 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }} // Trigger animation when 50% of the div is in view
              variants={textVariants}
            >
              <Heading size="lg" color="red">
                {"Od kod ime Klub Ada?"}
              </Heading>
              <Paragraph size="lg" weight="bold">
                {
                  "Navdih za ime smo našli v pionirki računalništva Adi Lovelace – matematičarki, pisateljici in prvi programerki."
                }
              </Paragraph>
              <Paragraph size="lg">
                {
                  "V 19. stoletju je za analitični stroj Charlesa Babbaga, predhodnika sodobnega računalnika, zapisala prvi algoritem. Ada Lovelace je dokaz, da so ženske že od začetka sooblikovale tehnologijo, njen vpliv pa nas navdihuje tudi danes, ko skupaj gradimo prihodnost."
                }
              </Paragraph>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
