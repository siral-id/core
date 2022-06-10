import { getDatabase, getUniqueTrends, setupOctokit, upload } from "../mod.ts";

const ghToken = Deno.env.get("GH_TOKEN");
const octokit = setupOctokit(ghToken);

const db = getDatabase();

const uniqueTrends = getUniqueTrends(db);

await upload<string[]>(
  octokit,
  uniqueTrends,
  "FORWARD_LATEST_UNIQUE_TRENDS",
  "shopee-id-trends",
);

await upload<string[]>(
  octokit,
  uniqueTrends,
  "FORWARD_LATEST_UNIQUE_TRENDS",
  "tokopedia-trends",
);

Deno.exit();
