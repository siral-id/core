import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { bootstrapDB, shutdownDB } from "../test_utility.ts";
import { createDummyProduct } from "./product_services.test.ts";
import { createProductSnapshot } from "../../mod.ts";

export const createDummyProductSnapshot = (db: DB) => {
  const product = createDummyProduct(db);
  const {
    name: productName,
    description: productDescription,
    source: productSource,
    url: productUrl,
    discount: productDiscount,
    price: productPrice,
    ratingAverage: productRatingAverage,
    ratingCount: productRatingCount,
    stock: productStock,
    view: productView,
    sold: productSold,
  } = product;

  createProductSnapshot({
    product,
    productName,
    productDescription,
    productSource,
    productUrl,
    productDiscount,
    productPrice,
    productRatingAverage,
    productRatingCount,
    productStock,
    productView,
    productSold,
    productImage1: "image_1",
    productImage2: "image_2",
    productImage3: "image3",
  }, db);
};

Deno.test("Make sure createProductSnapshot is correct", async () => {
  const db = bootstrapDB();
  createDummyProductSnapshot(db);

  const [count] = db.query<[number]>(
    "SELECT COUNT(*) FROM product_Snapshots",
  );

  assertEquals(count, [1]);

  await shutdownDB(db);
});
