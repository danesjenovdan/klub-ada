import { SearchIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * One coded message of the AdaHack 2026 treasure hunt
 * (hack.klub-ada.si/treasure-hunt) and the hints that help decode it. The site
 * numbers puzzles and hints itself ("Puzzle #1", "Hint #1"), in order.
 */
export const hack26TreasureHuntPuzzle = defineType({
  name: "hack26TreasureHuntPuzzle",
  title: "Hackathon 26 Treasure Hunt Puzzle",
  type: "document",
  icon: SearchIcon,
  fields: [
    defineField({
      name: "order",
      title: "Order",
      description: "Puzzles are shown from the lowest number up.",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hints",
      title: "Hints",
      description: "From the gentlest nudge to the near-giveaway.",
      type: "array",
      of: [
        defineArrayMember({
          name: "hint",
          type: "object",
          fields: [
            {
              name: "sl",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "en",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: { select: { title: "sl" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { order: "order", hint: "hints.0.sl" },
    prepare: ({ order, hint }) => ({
      title: `Uganka #${order}`,
      subtitle: hint,
    }),
  },
});
