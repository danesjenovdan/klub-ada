import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * A member of the AdaHack 2026 jury. Not shown on the hackathon site yet;
 * each one becomes a social post on the posts page (`/objave`).
 */
export const hack26Judge = defineType({
  name: "hack26Judge",
  title: "Hackathon 26 Judge",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      description: "E.g. 'CTO @ Epilog'.",
      type: "object",
      fields: [
        { name: "en", type: "string" },
        { name: "sl", type: "string" },
      ],
    }),
    defineField({
      name: "photo",
      title: "Photo",
      description: "Shown in a retro window on the post. A portrait crops best.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Posts are numbered in this order.",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role.sl", media: "photo" },
  },
});
