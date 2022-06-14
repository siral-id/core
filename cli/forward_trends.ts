import { getDatabase, getUniqueTrends, setupOctokit, uploadWithRetry, Pipeline, Repositories } from "../mod.ts";

const ghToken = Deno.env.get("GH_TOKEN");
const octokit = setupOctokit(ghToken);

const db = getDatabase();

const uniqueTrends = getUniqueTrends(db);

const pipelines = [Pipeline.ForwardShopeeTrends, Pipeline.ForwardTokopediaTrends]

await Promise.all(pipelines.map(async(pipeline) => {
  await uploadWithRetry<string[]>(
    octokit,
    uniqueTrends,
    pipeline
  );
}));

Deno.exit();
