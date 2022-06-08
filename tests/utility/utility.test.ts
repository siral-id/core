import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { sleep } from "../../mod.ts";

Deno.test("Make sure sleep is correct", async () => {
  assertEquals(await sleep(0.001), undefined);
});
