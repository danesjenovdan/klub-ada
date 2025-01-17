import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  // validation: (rule) =>
  //   rule.custom((fields) => {
  //     if (fields.pinned.length > 0 && Object.keys(fields.guest).length > 0)
  //       return "You can't have an author AND guest author";
  //     return true;
  //   }),
  icon: DocumentTextIcon,
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
      name: "pinned",
      description:
        "Pin this post to the top of the blog. Keep in mind only three posts should be pinned at the same time.",
      title: "Pin blog",
      type: "boolean",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "teamMember" },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
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
      name: "categories",
      title: "Categories",
      type: "array",
      validation: (Rule: any) => Rule.required(),
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "publishedAt",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
    }),
    defineField({
      name: "body",
      title: "Block",
      type: "blockContent",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "event",
      title: "Event",
      type: "reference",
      to: { type: "event" },
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
