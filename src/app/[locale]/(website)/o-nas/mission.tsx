"use client";

import { Heading } from "@/src/app/[locale]/components/heading";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import Image from "next/image";
import { motion } from "framer-motion";
import mission from "../../../../../public/assets/mission.webp";
import ada from "../../../../../public/assets/ada-lovelace.webp";
import beginning from "../../../../../public/assets/beginning-story.webp";
import { useTranslations } from "next-intl";

export function Mission() {
  const t = useTranslations("AboutUs");
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
                {t("mission.title")}
              </Heading>
              <Paragraph size="lg" weight="bold">
                {t("mission.subtitle")}
              </Paragraph>
              <Paragraph size="lg">{t("mission.description")}</Paragraph>
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
                {t("story.title")}
              </Heading>
              <Paragraph size="lg" weight="bold">
                {t("story.subtitle")}
              </Paragraph>
              <Paragraph size="lg">{t("story.description")}</Paragraph>
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
                {t("name.title")}
              </Heading>
              <Paragraph size="lg" weight="bold">
                {t("name.subtitle")}
              </Paragraph>
              <Paragraph size="lg">{t("name.description")}</Paragraph>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
