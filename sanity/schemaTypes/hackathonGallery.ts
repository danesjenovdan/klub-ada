import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The photos of one hackathon edition. Each year gets its own document, so next
 * year's pictures are a new document rather than a code change - the gallery
 * page always shows the newest year it can find.
 */
export const hackathonGallery = defineType({
  name: "hackathonGallery",
  title: "Hackathon Gallery",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      description: "Which hackathon these photos are from, e.g. 2025.",
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: "images",
      title: "Photos",
      description:
        "Drag a whole folder in at once. Reorder by dragging - this is the order they appear in on the site.",
      type: "array",
      of: [
        defineArrayMember({
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
    }),
  ],
  preview: {
    select: {
      year: "year",
      media: "images.0",
    },
    prepare({ year, media }) {
      return {
        title: year ? `AdaHack ${year}` : "AdaHack (no year set)",
        media,
      };
    },
  },
});
