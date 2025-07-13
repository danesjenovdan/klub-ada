import Image from "next/image";
import { Paragraph } from "./paragraph";
import { Heading } from "./heading";
import { IconBrandLinkedinFilled } from "@tabler/icons-react";
import { TeamMember } from "../../utils/interface";
import imageLoader from "../../utils/image-loader";

interface TeamMemberProps {
  member: TeamMember;
}

const TeamMemberComponent = ({ member }: TeamMemberProps) => {
  const imageSrc = imageLoader(member.image);

  const memeberBioParts = member.bio.split(" ");

  return (
    <div className="flex flex-col bg-white gap-6 border border-black rounded-2xl p-4 lg:p-6 h-full justify-between">
      <div className="flex flex-col h-full gap-4">
        <Image
          src={imageSrc}
          width={700}
          height={700}
          alt={member.image.alt || "Placeholder alt"}
          className="w-full object-cover md:aspect-square rounded-2xl"
        />
        <div className="flex flex-col gap-2 md:gap-4">
          <Heading size="xs">{member.name}</Heading>
          <div className="flex gap-2 items-center">
            <Paragraph size="xl">{member.role}</Paragraph>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red group"
            >
              <IconBrandLinkedinFilled
                className="text-black group-hover:text-red"
                size={24}
                strokeWidth="2"
              />
            </a>
          </div>
          <Paragraph>
            {memeberBioParts.map((bioPart) => {
              if (bioPart === "info@klub-ada.si") {
                return (
                  <a
                    href={`mailto:${bioPart}`}
                    className="text-red font-medium"
                    key={bioPart}
                  >
                    info@klub-ada.si
                  </a>
                );
              }
              return bioPart + " ";
            })}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberComponent;
