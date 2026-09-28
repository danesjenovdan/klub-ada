import { StarFilledIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const hack26Reward = defineType({
  name: "hack26Reward",
  title: "Hackathon 26 Reward",
  type: "document",
  icon: StarFilledIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "E.g. 'First place' or 'Abelium challenge'.",
      type: "object",
      fields: [
        { name: "en", type: "string", validation: (Rule) => Rule.required() },
        { name: "sl", type: "string", validation: (Rule) => Rule.required() },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      description: "Optional, e.g. the challenge topic.",
      type: "object",
      fields: [
        { name: "en", type: "string" },
        { name: "sl", type: "string" },
      ],
    }),
    defineField({
      name: "amount",
      title: "Amount",
      description: "Shown as written, e.g. '2000 EUR' or 'Lego set'.",
      type: "object",
      fields: [
        { name: "en", type: "string", validation: (Rule) => Rule.required() },
        { name: "sl", type: "string", validation: (Rule) => Rule.required() },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      description:
        "Optional, shown in two corners of the turned-over card. Drawn 20px tall, so a simple mark reads better than a wordmark.",
      type: "image",
    }),
    defineField({
      name: "isMain",
      title: "Main award",
      description: "Shown highlighted, full width, above the other rewards.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title.sl", subtitle: "amount.sl" },
  },
});
