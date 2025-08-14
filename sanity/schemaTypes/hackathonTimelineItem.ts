import { TimelineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const hackathonTimelineItem = defineType({
  name: "hackathonTimelineItem",
  title: "Hackathon Timeline Item",
  type: "document",
  icon: TimelineIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "object",
      fields: [
        { name: "en", type: "string", validation: (Rule) => Rule.required() },
        { name: "sl", type: "string", validation: (Rule) => Rule.required() },
      ],
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        timeStep: 15,
      },
    }),
  ],
  preview: {
    select: {
      title: "label.sl",
      time: "time",
    },
    prepare(selection) {
      const { time } = selection;
      return {
        ...selection,
        subtitle:
          time &&
          `${new Date(time).toDateString() + " at " + new Date(time).toLocaleTimeString()}`,
      };
    },
  },
});
