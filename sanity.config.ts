"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { documentInternationalization } from "@sanity/document-internationalization";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig([
  {
    name: "KlubAda",
    basePath: "/sl/studio",
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schemaTypes' folder
    schema,
    plugins: [
      structureTool({ structure }),
      // Vision is for querying with GROQ from inside the Studio
      // https://www.sanity.io/docs/the-vision-plugin
      visionTool({ defaultApiVersion: apiVersion }),
      documentInternationalization({
        supportedLanguages: [
          { id: "sl", title: "Slovenščina" },
          { id: "en", title: "English" },
        ],
        schemaTypes: ["teamMember", "activity", "post"],
      }),
    ],
  },
  {
    name: "KlubAdaEng",
    basePath: "/en/studio",
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schemaTypes' folder
    schema,
    plugins: [
      structureTool({ structure }),
      // Vision is for querying with GROQ from inside the Studio
      // https://www.sanity.io/docs/the-vision-plugin
      visionTool({ defaultApiVersion: apiVersion }),
      documentInternationalization({
        supportedLanguages: [
          { id: "sl", title: "Slovenščina" },
          { id: "en", title: "English" },
        ],
        schemaTypes: ["teamMember", "activity", "post"],
      }),
    ],
  },
]);
