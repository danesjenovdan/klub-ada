import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return { title: title.sl };
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "en", type: "string", validation: (Rule) => Rule.required() },
        { name: "sl", type: "string", validation: (Rule) => Rule.required() },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.sl",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
