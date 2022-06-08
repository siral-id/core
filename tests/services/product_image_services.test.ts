import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { bootstrapDB, shutdownDB } from "../test_utility.ts";
import { createDummyProduct } from "./product_services.test.ts";
import { createProductImage } from "../../mod.ts";

export const createDummyProductImage = (db: DB) => {
  const product = createDummyProduct(db);
  createProductImage({ product, image: "image_url" }, db);
};

Deno.test("Make sure createProductImage is correct", async () => {
  const db = bootstrapDB();
  createDummyProductImage(db);

  const [count] = db.query<[number]>(
    "SELECT COUNT(*) FROM product_images",
  );

  assertEquals(count, [1]);

  await shutdownDB(db);
});
