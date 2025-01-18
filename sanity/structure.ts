import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Collections")
    .items([
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.divider(),
      S.documentTypeListItem("teamMember").title("Team Members"),
      S.divider(),
      S.documentTypeListItem("activity").title("Activities"),
      S.documentTypeListItem("event").title("Events"),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["post", "category", "teamMember", "activity", "event"].includes(
            item.getId()!
          )
      ),
    ]);
