import { PresentationIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * A workshop held during AdaHack 2026. Not shown on the hackathon site yet;
 * each one becomes a social post on the posts page (`/objave`).
 */
export const hack26Workshop = defineType({
  name: "hack26Workshop",
  title: "Hackathon 26 Workshop",
  type: "document",
  icon: PresentationIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "en", type: "string", validation: (Rule) => Rule.required() },
        { name: "sl", type: "string", validation: (Rule) => Rule.required() },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "speaker",
      title: "Speaker",
      description: "Who runs the workshop, e.g. 'Ana Novak'.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "speakerRole",
      title: "Speaker role",
      description: "Optional, e.g. 'Senior developer @ Epilog'.",
      type: "object",
      fields: [
        { name: "en", type: "string" },
        { name: "sl", type: "string" },
      ],
    }),
    defineField({
      name: "photo",
      title: "Speaker photo",
      description: "Shown in a retro window on the post. A portrait crops best.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "time",
      title: "Start",
      type: "datetime",
      options: { dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm", timeStep: 15 },
    }),
    defineField({
      name: "endTime",
      title: "End",
      type: "datetime",
      options: { dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm", timeStep: 15 },
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "One or two sentences. Long text is cut off on the post.",
      type: "object",
      fields: [
        { name: "en", type: "text", rows: 3 },
        { name: "sl", type: "text", rows: 3 },
      ],
    }),
  ],
  preview: {
    select: { title: "title.sl", subtitle: "speaker", media: "photo" },
  },
});
