export * from "./header.ts";

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
