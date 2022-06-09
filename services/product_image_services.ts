import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";
import {
  generateKeyValueMap,
  ICreateProductImage,
  IGetProductImagesByProduct,
  IUpdateProductImage,
  ProductImageEntity,
} from "../mod.ts";

export function createProductImage(
  { image, product: { productId } }: ICreateProductImage,
  database: DB,
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
  database: DB,
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

export function getProductImagesByProduct(
  { product: { productId } }: IGetProductImagesByProduct,
  database: DB,
): ProductImageEntity[] {
  const getProductImageByProductIdQuery = database.prepareQuery<
    [
      number,
      string,
      number,
      number,
      number,
    ]
  >(
    "SELECT productImageId, image, createdAt, updatedAt FROM product_images WHERE productId = ?",
  );
  const images = getProductImageByProductIdQuery.all([productId]);
  getProductImageByProductIdQuery.finalize();
  return images.map(([productImageId, image, createdAt, updatedAt]) => ({
    productImageId,
    image,
    createdAt,
    updatedAt,
  }));
}
