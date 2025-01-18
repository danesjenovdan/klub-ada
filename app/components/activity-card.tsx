import Image from "next/image";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";

type ActivityCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export function ActivityCard({
  title,
  description,
  imageSrc,
  imageAlt,
}: ActivityCardProps) {
  return (
    <div className="flex flex-col gap-6 bg-white rounded-2xl border border-black p-4 lg:p-6 h-full justify-between">
      <div className="flex flex-col gap-4">
        <Heading size="sm">{title}</Heading>
        <Paragraph>{description}</Paragraph>
      </div>
      <Image
        src={imageSrc}
        width={400}
        height={400}
        alt={imageAlt}
        className="w-full object-cover md:aspect-square rounded-2xl"
      />
    </div>
  );
}
