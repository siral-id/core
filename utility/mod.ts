export * from "./header.ts";
import { Octokit } from "https://cdn.skypack.dev/octokit@v1.7.2?dts";
import { retry } from "https://cdn.skypack.dev/@octokit/plugin-retry@v3.0.9?dts";
import { v4 } from "https://deno.land/std@0.142.0/uuid/mod.ts";

export function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function generateKeyValueMap<T>(
  parameters: T,
): string {
  let query = "";
  const parameterKeyToArray = Object.keys(parameters);
  parameterKeyToArray.map((key, index) => {
    if (index + 1 === parameterKeyToArray.length) {
      query += `${key} = ? `;
    } else {
      query += `${key} = ?, `;
    }
  });
  return query;
}

export async function download(url: string, filename: string) {
  const data = (await fetch(url)).arrayBuffer();
  console.log(`Saving ${url} to ${filename}`);
  return Deno.writeFile(filename, new Uint8Array(await data));
}

export function setupOctokit(ghToken?: string): Octokit {
  if (!ghToken) throw new Error("GH_TOKEN not found");
  const OctokitWithRetry = Octokit.plugin(retry)
  return new OctokitWithRetry({auth: ghToken})
}

export async function upload<T>(
  octokit: Octokit,
  data: T,
  title: string,
  repo = "core",
  sleepDuration = 0.1
) {
  const uuid = v4.generate();

  await octokit.rest.issues.create({
    owner: "siral-id",
    repo,
    title: `${title}_${uuid}`,
    body: JSON.stringify(data),
  });

  await sleep(sleepDuration)
}

// github limit 65536
export function chunkItems<T>(items: T[], maxSize = 65536) {
  const calculateMaxChunkSize = (dataSize: number, maxSize: number) =>
    Math.ceil(dataSize / maxSize);

  const chunkSize = calculateMaxChunkSize(
    JSON.stringify(items).length,
    maxSize,
  );

  return items.reduce((chunks: T[][], item: T, index) => {
    const chunk = Math.floor(index / chunkSize);
    chunks[chunk] = ([] as T[]).concat(chunks[chunk] || [], item);
    return chunks;
  }, []);
}
