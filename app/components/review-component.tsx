import Image from "next/image";
import { Paragraph } from "./paragraph";
import { Card } from "./card";

interface ReviewProps {
  paragraph: string;
  emphasis: string;
  image: string;
  alt: string;
  title: string;
  href: string;
}

export default function ReviewComponent({
  paragraph,
  emphasis,
  image,
  alt,
  title,
  href,
}: ReviewProps) {
  return (
    <>
      <Card bgColor="bg-blue200" hasBorder={false}>
        <div className="flex flex-col h-full justify-between gap-5 md:gap-10">
          <div className="flex flex-col gap-3">
            <Paragraph size="md" weight="semiBold">
              {paragraph}
            </Paragraph>
            <Paragraph size="md" weight="bold">
              {emphasis}
            </Paragraph>
          </div>
          <div className="flex gap-3 items-center">
            <Image
              src={image}
              width={50}
              height={50}
              alt={alt}
              className="rounded-full max-w-11 max-h-11 object-cover border border-black"
            />
            <a href={href} target="_blank">
              <Paragraph size="md" weight="medium">
                {title}
              </Paragraph>
            </a>
          </div>
        </div>
      </Card>
    </>
  );
}
