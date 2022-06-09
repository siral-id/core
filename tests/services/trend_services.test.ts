import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import { bootstrapDB, shutdownDB } from "../test_utility.ts";
import { createTrend, Source } from "../../mod.ts";

const trendData = {
  keyword: "Hello",
  image: "http_image_url",
  count: 1,
  source: Source.TOKOPEDIA,
};

Deno.test("Make sure createTrend is correct", async () => {
  const db = bootstrapDB();
  createTrend(trendData, db);

  const [count] = db.query<[number]>(
    "SELECT COUNT(*) FROM trends",
  );

  assertEquals(count, [1]);

  await shutdownDB(db);
});
