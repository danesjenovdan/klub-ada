import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { teamMemberType } from "./teamMemberType";
import { activityType } from "./activityType";
import { eventType } from "./eventType";
import { hackathonTimelineItem } from "./hackathonTimelineItem";
import { hack26TimelineItem } from "./hack26TimelineItem";
import { hackathonFaqItem } from "./hackathonFaqItem";
import { hackathonGallery } from "./hackathonGallery";
import { hack26Sponsor } from "./hack26Sponsor";
import { hack26Reward } from "./hack26Reward";
import { hack26Workshop } from "./hack26Workshop";
import { hack26Judge } from "./hack26Judge";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    activityType,
    eventType,
    teamMemberType,
    hackathonTimelineItem,
    hack26TimelineItem,
    hackathonFaqItem,
    hackathonGallery,
    hack26Sponsor,
    hack26Reward,
    hack26Workshop,
    hack26Judge,
  ],
};
