import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const hack26Sponsor = defineType({
  name: "hack26Sponsor",
  title: "Hackathon 26 Sponsor",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      description: "Which group on the sponsors page this sponsor shows up in.",
      type: "string",
      options: {
        list: [
          { title: "Gold", value: "gold" },
          { title: "Silver", value: "silver" },
          { title: "Bronze", value: "bronze" },
          { title: "Vibe coding partner", value: "vibe" },
          { title: "Partner", value: "partner" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Website",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Logo",
      description: "SVG or PNG with a transparent background, shown on dark.",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "type", media: "image" },
  },
});
