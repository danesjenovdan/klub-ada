import { BoltIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const activityType = defineType({
  name: "activity",
  title: "Activity",
  type: "document",
  icon: BoltIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "description",
      type: "string",
    }),
    defineField({
      name: "activityImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "activityImage",
    },
  },
});
