import { InfoOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const hackathonFaqItem = defineType({
  name: "hackathonFaqItem",
  title: "Hackathon FAQ Item",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "question",
      title: " Question",
      type: "object",
      fields: [
        { name: "en", type: "string", validation: (Rule) => Rule.required() },
        { name: "sl", type: "string", validation: (Rule) => Rule.required() },
      ],
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: " Answer",
      type: "object",
      fields: [
        { name: "en", type: "string", validation: (Rule) => Rule.required() },
        { name: "sl", type: "string", validation: (Rule) => Rule.required() },
      ],
      validation: (Rule: any) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "question.sl",
    },
    prepare(selection) {
      return {
        ...selection,
      };
    },
  },
});
