import { TimelineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const hack26TimelineItem = defineType({
  name: "hack26TimelineItem",
  title: "Hackathon 26 Timeline Item",
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
        // displayTimeZone: "Europe/Berlin",
      },
    }),
    defineField({
      name: "endTime",
      title: "End Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm",
        timeStep: 15,
        // displayTimeZone: "Europe/Berlin",
      },
    }),
    defineField({
      name: "icon",
      title: "Icon",
      description:
        "The pixel-art icon on the board tile. Small square image, ideally 64x64 - it is drawn without smoothing so the pixels stay crisp.",
      type: "image",
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Shown in the popup after clicking the tile.",
      type: "object",
      fields: [
        { name: "en", type: "text", rows: 3 },
        { name: "sl", type: "text", rows: 3 },
      ],
    }),
    defineField({
      name: "tag",
      title: "Tag",
      description:
        "Optional game-style badge pinned to the corner of the tile, e.g. 'MAX PARTY: 4' or '+10 HP'. Keep it short.",
      type: "object",
      fields: [
        { name: "en", type: "string" },
        { name: "sl", type: "string" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "label.sl",
      time: "time",
      media: "icon",
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
