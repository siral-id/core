import {exists} from "https://deno.land/std/fs/mod.ts"
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { sleep, generateKeyValueMap, download } from "../../mod.ts";

Deno.test("Make sure sleep is correct", async () => {
  assertEquals(await sleep(0.001), undefined);
});

Deno.test("Make sure generateKeyValueMap is correct", () => {
  assertEquals(generateKeyValueMap({"hello": "world"}), "hello = ? ");
  assertEquals(generateKeyValueMap({"hello": "world", "world": "hello"}), "hello = ?, world = ? ");
});

Deno.test("Make sure download is correct", async () => {
  const url = "https://raw.githubusercontent.com/vousmeevoyez/kong-konga-example/master/setup.png"
  await download(url, "test.png")

  assertEquals(await exists("test.png"), true)
});
