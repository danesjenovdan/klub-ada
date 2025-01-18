import Image from "next/image";
import { Paragraph } from "./paragraph";
import { Heading } from "./heading";

type BlogCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export function BlogCard({
  title,
  description,
  imageSrc,
  imageAlt,
}: BlogCardProps) {
  return (
    <article className="flex flex-col gap-6 pink100 rounded-2xl border border-black p-6 xl:p-8 ${className}">
      <div className="flex flex-col gap-4">
        <Image
          src={imageSrc}
          width={400}
          height={400}
          alt={imageAlt}
          className="h-80 w-full object-cover md:h-full md:w-full rounded-2xl"
        />
        <Heading size="sm">{title}</Heading>
        <Paragraph size="lg" weight="regular">
          {description}
        </Paragraph>
      </div>
    </article>
  );
}
