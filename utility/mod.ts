export * from "./header.ts";
import { Octokit } from "https://cdn.skypack.dev/octokit@v1.7.2?dts";
import { throttling } from "https://cdn.skypack.dev/@octokit/plugin-throttling@v3.6.2?dts";
import { retry } from "https://cdn.skypack.dev/@octokit/plugin-retry@v3.0.9?dts";
import { IGithubCreateGist, Pipeline, Repositories } from "../mod.ts";
export { Octokit };

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

export async function uploadWithRetry<T>(
  octokit: Octokit,
  data: T,
  pipeline: Pipeline,
  retryCount = 0,
  maxRetry = 10,
): Promise<void> {
  if (retryCount === maxRetry) return;
  try {
    await upload<T>(
      octokit,
      data,
      pipeline,
      Repositories[pipeline],
    );
  } catch (error) {
    console.error(error);
    await sleep(retryCount);
    await uploadWithRetry(octokit, data, pipeline, retryCount + 1);
  }
}

export async function createGist<T>(
  octokit: Octokit,
  content: T,
  fileName: string,
  description: string,
  isPublic: boolean,
): Promise<IGithubCreateGist> {
  return await octokit.request("POST /gists", {
    description,
    "public": isPublic,
    files: {
      [fileName]: {
        content,
      },
    },
  });
}

export async function createGistWithRetry<T>(
  octokit: Octokit,
  data: T,
  fileName = "upload.json",
  description = `${new Date()}`,
  isPublic = true,
  retryCount = 0,
  maxRetry = 10,
  lastError?: string,
): Promise<IGithubCreateGist> {
  if (retryCount === maxRetry) throw new Error(lastError);
  try {
    return await createGist<T>(
      octokit,
      data,
      fileName,
      description,
      isPublic,
    );
  } catch (error) {
    await sleep(retryCount);
    return await createGistWithRetry(
      octokit,
      data,
      fileName,
      description,
      isPublic,
      retryCount + 1,
      error,
    );
  }
}

// github limit 65536
export function chunkItems<T>(items: T[], maxSize = 65536) {
  const sizeof = (obj: T[]) =>  new Blob([JSON.stringify(obj)], {type : 'application/json'}).size;

  //start first chunk
  let chunk:T[] = [];

  //add it to the array
  const result = [chunk];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    //concat in order to not modify the chunk and do a check before actually adding
    const size = sizeof(chunk.concat(item))
    //check if the limit would be exceeded
    if (size > maxSize) {
      //if so, start a new chunk
      chunk = [];
      result.push(chunk);
    }
    //add item to chunk
    chunk.push(item);
  }
  return result;
}

export function generateResponse(
  data: Record<string, unknown>,
  status = 200,
): Promise<Response> {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const init = { status };
  return new Promise((resolve) => resolve(new Response(blob, init)));
}

export const _internals = { Octokit, throttling };
