import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "eventImage",
      title: "Event image",
      type: "image",
      validation: (Rule: any) => Rule.required(),
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
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "applyLink",
      title: "Apply Link",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "blog",
      type: "string",
    }),
    defineField({
      name: "eventTime",
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
      title: "title",
      media: "eventImage",
    },
  },
});
