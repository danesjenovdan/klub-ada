import { Card } from "./card";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";

export function StatsCard({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <Card bgColor="bg-white" contentAlignment="center">
      <div className="flex flex-col gap-2 md:gap-4">
        <Heading size="lg" className="text-red text-center">
          {number}
        </Heading>
        <Paragraph size="lg" weight="bold" className="text-black text-center">
          {label}
        </Paragraph>
      </div>
    </Card>
  );
}
