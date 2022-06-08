import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { ICreateProductSnapshot } from "../mod.ts";

export function createProductSnapshot(
  { product: { productId }, productImages, ...parameters }:
    ICreateProductSnapshot,
  database: DB,
) {
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000.0);

  database.query(
    "INSERT INTO product_snapshots (productName, productDescription, productSource, productUrl, productDiscount, productPrice, productRatingAverage, productRatingCount, productSold, productStock, productView, productImages, createdAt, updatedAt, productId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      ...Object.values(parameters),
      JSON.stringify(productImages),
      timestamp,
      timestamp,
      productId,
    ],
  );
}
