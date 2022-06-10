export * from "./header.ts";
import { Octokit } from "https://cdn.skypack.dev/octokit@v1.7.2?dts";
import { throttling } from "https://cdn.skypack.dev/@octokit/plugin-throttling@v3.6.2?dts";
import { retry } from "https://cdn.skypack.dev/@octokit/plugin-retry@v3.0.9?dts";

import { v4 } from "https://deno.land/std@0.142.0/uuid/mod.ts";

export function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, 10 ** seconds));
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
  const OctokitWithRetry = Octokit.plugin(retry);
  const OctokitWithThrottling = OctokitWithRetry.plugin(throttling);
  return new OctokitWithThrottling({
    auth: ghToken,
    throttle: {
      onRateLimit: (
        retryAfter: number,
        options: {
          method: string;
          url: string;
          request: { retryCount: number };
        },
        octokit: Octokit,
      ) => {
        octokit.log.warn(
          `Request quota exhausted for request ${options.method} ${options.url}`,
        );

        if (options.request.retryCount === 0) {
          // only retries once
          octokit.log.info(`Retrying after ${retryAfter} seconds!`);
          return true;
        }
      },
      onSecondaryRateLimit: (
        _: number,
        options: {
          method: string;
          url: string;
          request: { retryCount: number };
        },
        octokit: Octokit,
      ) => {
        // does not retry, only logs a warning
        octokit.log.warn(
          `SecondaryRateLimit detected for request ${options.method} ${options.url}`,
        );
      },
    },
  });
}

export async function upload<T>(
  octokit: Octokit,
  data: T,
  title: string,
  repo = "core",
) {
  const uuid = v4.generate();

  await octokit.rest.issues.create({
    owner: "siral-id",
    repo,
    title: `${title}_${uuid}`,
    body: JSON.stringify(data),
  });
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
