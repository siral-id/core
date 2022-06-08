import {
  assertEquals,
  assertObjectMatch,
} from "https://deno.land/std/testing/asserts.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { bootstrapDB, shutdownDB } from "../test_utility.ts";
import {
  createProduct,
  getProductByProductId,
  Source,
  updateProduct,
} from "../../mod.ts";

const productData = {
  externalId: "123456",
  name: "product name",
  description: "desc",
  source: Source.TOKOPEDIA,
  url: "url",
  discount: 0,
  price: 1,
  ratingAverage: 1,
  ratingCount: 1,
  sold: 1,
  stock: 1,
  view: 1,
};

export const createDummyProduct = (db: DB) => {
  createProduct(productData, db);
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000.0);
  return {
    productId: "1_123456",
    ...productData,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

Deno.test("Make sure createProduct is correct", async () => {
  const db = bootstrapDB();
  createDummyProduct(db);

  const [count] = db.query<[number]>(
    "SELECT COUNT(*) FROM products",
  );

  assertEquals(count, [1]);

  await shutdownDB(db);
});

Deno.test("Make sure updateProduct is correct", async () => {
  const db = bootstrapDB();

  createDummyProduct(db);

  updateProduct({
    productId: "1_123456",
    name: "new product name",
    description: "new desc",
  }, db);

  const query = db.prepareQuery<[string, string]>(
    "SELECT name, description FROM products WHERE productId = ?",
  );
  assertEquals(query.one(["1_123456"]), ["new product name", "new desc"]);
  query.finalize();

  await shutdownDB(db);
});

Deno.test("Make sure getProductByProductId is correct", async () => {
  const db = bootstrapDB();

  createDummyProduct(db);

  const product = getProductByProductId({ productId: "1_123456" }, db);

  assertObjectMatch(product, productData);

  await shutdownDB(db);
});
