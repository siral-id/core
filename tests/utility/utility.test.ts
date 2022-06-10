import { exists } from "https://deno.land/std@0.142.0/fs/mod.ts";
import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts";

import { chunkItems, download, generateKeyValueMap, sleep } from "../../mod.ts";

Deno.test("Make sure sleep is correct", async () => {
  assertEquals(await sleep(0.001), undefined);
});

Deno.test("Make sure generateKeyValueMap is correct", () => {
  assertEquals(generateKeyValueMap({ "hello": "world" }), "hello = ? ");
  assertEquals(
    generateKeyValueMap({ "hello": "world", "world": "hello" }),
    "hello = ?, world = ? ",
  );
});

Deno.test("Make sure download is correct", async () => {
  const url =
    "https://raw.githubusercontent.com/vousmeevoyez/kong-konga-example/master/setup.png";
  await download(url, "test.png");

  assertEquals(await exists("test.png"), true);
});

Deno.test("Make sure chunkItems is correct", () => {
  assertEquals(chunkItems<number>([1, 2, 3]), [[1, 2, 3]]);
});
