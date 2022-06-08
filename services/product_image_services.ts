import {
  db,
  generateKeyValueMap,
  ICreateProductImage,
  IUpdateProductImage,
} from "../mod.ts";

export function createProductImage(
  { image, product: { productId } }: ICreateProductImage,
  database = db,
) {
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000.0);
  database.query(
    "INSERT INTO product_images (image, createdAt, updatedAt, productId) VALUES (?, ?, ?, ?)",
    [
      image,
      timestamp,
      timestamp,
      productId,
    ],
  );
}

export function updateProductImage(
  { productImageId, ...parameters }: IUpdateProductImage,
  database = db,
) {
  const date = new Date();
  const updatedAt = Math.floor(date.getTime() / 1000.0);

  let query = "UPDATE product_images SET ";

  query += generateKeyValueMap(parameters);
  query += ", updatedAt = ?";
  query += "WHERE productImageId = ?";

  database.query(
    query,
    [...Object.values(parameters), updatedAt, productImageId],
  );
}
