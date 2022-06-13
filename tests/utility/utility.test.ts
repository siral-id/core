import sinon from "https://cdn.skypack.dev/sinon@v14.0.0?dts";
import { exists } from "https://deno.land/std@0.142.0/fs/mod.ts";
import {
  assertEquals,
  assertObjectMatch,
} from "https://deno.land/std@0.142.0/testing/asserts.ts";

import {
  _internals,
  chunkItems,
  download,
  generateKeyValueMap,
  generateResponse,
  Octokit,
  setupOctokit,
  sleep,
  upload,
} from "../../mod.ts";

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
  assertEquals(chunkItems<number>([1, 2, 3]), [[1], [2], [3]]);
});

Deno.test("Make sure generateResponse is correct", async () => {
  const response = await generateResponse({ hello: "world" });
  assertEquals(response.status, 200);
  assertObjectMatch(await response.json(), { "hello": "world" });
});

Deno.test({
  name: "Make sure setupOctokit is correct",
  sanitizeResources: false,
  sanitizeOps: false,
}, () => {
  const spy = sinon.spy(Octokit, "plugin");
  setupOctokit("GH_TOKEN");

  assertEquals(spy.getCalls().length, 2);
});

Deno.test({
  name: "Make sure upload is correct",
}, async () => {
  const fake = { rest: { issues: { create: sinon.fake.resolves(null) } } };

  await upload<Record<string, unknown>>(fake, { "hello": "world" }, "TITLE");

  assertEquals(fake.rest.issues.create.callCount, 1); // calling information is saved
});
