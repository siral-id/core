import { db, ICreateProductSnapshot } from "../mod.ts";

export function createProductSnapshot(
  { product: { productId }, ...parameters }: ICreateProductSnapshot,
  database = db,
) {
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000.0);

  database.query(
    "INSERT INTO product_snapshots (productName, productDescription, productSource, productUrl, productDiscount, productPrice, productRatingAverage, productRatingCount, productSold, productStock, productView, productImage1, productImage2, productImage3, createdAt, updatedAt, productId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      ...Object.values(parameters),
      timestamp,
      timestamp,
      productId,
    ],
  );
}
