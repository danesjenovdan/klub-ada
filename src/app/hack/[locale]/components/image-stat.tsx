import { Heading } from "@/src/app/[locale]/components/heading";
import Image, { StaticImageData } from "next/image";

type ImageStatProps = {
  src: StaticImageData;
  label: string;
  stat: string;
};
export function ImageStat({ src, label, stat }: ImageStatProps) {
  return (
    <div className="relative w-full min-h-[200px] min-w-[280px] max-w-[400px] md:min-w-[400px] md:min-h-[400px] rounded-lg">
      <Image
        src={src}
        alt="Stats background image"
        fill={true}
        objectFit="cover"
        className="rounded-lg"
      />
      <div className="flex flex-col absolute w-full h-full top-0 left-0 items-center justify-center">
        <Heading
          color="red"
          className="font-paragraph text-6xl sm:text-7xl md:text-8xl"
          size="lg"
        >
          {stat}
        </Heading>
        <Heading className="font-paragraph" color="white" size="lg">
          {label}
        </Heading>
      </div>
    </div>
  );
}
