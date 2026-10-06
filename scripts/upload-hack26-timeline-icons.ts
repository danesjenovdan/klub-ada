/**
 * Uploads the hackathon 26 timeline icons in `public/assets/hackathon26/timeline`
 * to Sanity and sets them as the `icon` of the matching `hack26TimelineItem`,
 * matched on the English label.
 *
 * Run with the CLI's login (no token needed):
 *   npx sanity exec scripts/upload-hack26-timeline-icons.ts --with-user-token
 * Pass English labels as arguments to only upload those, e.g.
 *   ... --with-user-token -- "Awards ceremony"
 */
import { readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2024-12-03" });

const DIR = join(process.cwd(), "public/assets/hackathon26/timeline");

/** English label in Sanity -> icon file. */
const ICONS: Record<string, string> = {
  Registration: "01-registration.svg",
  "Opening ceremony": "02-opening-ceremony.svg",
  "Team formation": "03-team-formation.svg",
  "Hacking begins": "04-hacking-begins.svg",
  "Midnight pizza": "05-midnight-pizza.svg",
  "Checkpoint demo": "06-checkpoint-demo.svg",
  "Code freeze": "07-code-freeze.svg",
  "Final demos": "08-final-demos.svg",
  Judging: "09-judging.svg",
  "Awards ceremony": "10-awards.svg",
};

type Item = { _id: string; en: string; iconRef?: string };

async function main() {
  const items = await client.fetch<Item[]>(
    `*[_type == "hack26TimelineItem" && !(_id in path("drafts.**"))]{ _id, "en": label.en, "iconRef": icon.asset._ref }`,
  );

  const unmatched = items.filter((item) => !(item.en in ICONS));
  if (unmatched.length) {
    console.warn(
      "No icon mapped for:",
      unmatched.map((item) => item.en).join(", "),
    );
  }

  const only = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));

  for (const [label, file] of Object.entries(ICONS)) {
    if (only.length && !only.includes(label)) continue;
    const item = items.find((candidate) => candidate.en === label);
    if (!item) {
      console.warn(`No document with label.en "${label}", skipping ${file}`);
      continue;
    }

    const asset = await client.assets.upload(
      "image",
      readFileSync(join(DIR, file)),
      {
        filename: basename(file),
        contentType: "image/svg+xml",
        title: label,
      },
    );

    await client
      .patch(item._id)
      .set({
        icon: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        },
      })
      .commit();

    console.log(
      `${label}: ${file} -> ${asset._id} (was ${item.iconRef ?? "none"})`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
