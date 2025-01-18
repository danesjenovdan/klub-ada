import EventComponent from "@/app/components/event-component";
import { Heading } from "@/app/components/heading";
import { PageWrapper } from "@/app/components/page-wrapper";
import { client } from "@/sanity/lib/client";
import { Event } from "../../utils/interface";

export async function getEvents(today: string) {
  const query = `*[
    _type == "event" && eventTime <= $today
  ] | order(eventTime) {
  title,
  description,
  eventImage,
  slug,
  eventTime,
  _id,
}`;
  const data = await client.fetch(query, { today });
  return data;
}

export default async function PastEvents() {
  const today = new Date().toISOString().split("T")[0];
  const events: Event[] = await getEvents(today);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-8 md:gap-16">
        <div className="max-w-sm md:max-w-2xl">
          <Heading size="lg">Pretekli dogodki</Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="w-full">
              <EventComponent event={event} />
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
