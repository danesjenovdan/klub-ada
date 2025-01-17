import { Heading } from "@/app/components/heading";
import { PageWrapper } from "@/app/components/page-wrapper";
import TeamMemberComponent from "@/app/components/team-member-component";
import { TeamMember } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

async function getTeamMember() {
  const query = `*[_type == "teamMember"]| order(_updatedAt desc){
    image,
    name,
    role,
    bio,
    linkedin,
    _id,
    alt,
}`;
  const data = await client.fetch(query);
  return data;
}
export default async function Team() {
  const teamMember: TeamMember[] = await getTeamMember();

  return (
    <PageWrapper>
      <div id="team" className="flex flex-col gap-6 md:gap-12">
        <div className="flex items-center gap-2">
          <Heading size="xl">{"Naša"}</Heading>
          <Image
            src="/assets/flower.svg"
            width={100}
            height={100}
            alt="Flower illustration"
            className="w-[50px] md:w-[80px] lg:w-[100]"
          />
          <Heading size="xl">{"ekipa"}</Heading>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMember.map((member) => (
            <div key={member._id} className="col-span-1">
              <TeamMemberComponent member={member} />
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
