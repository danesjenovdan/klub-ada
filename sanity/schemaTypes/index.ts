import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { teamMemberType } from "./teamMemberType";
import { activityType } from "./activityType";
import { eventType } from "./eventType";
import { hackathonTimelineItem } from "./hackathonTimelineItem";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    activityType,
    eventType,
    teamMemberType,
    hackathonTimelineItem,
  ],
};
