import { DB } from "https://deno.land/x/sqlite/mod.ts";
import {
  generateKeyValueMap,
  ICreateProduct,
  IGetProductByProductId,
  IUpdateProduct,
  ProductEntity,
} from "../mod.ts";

export function createProduct(
  parameters: ICreateProduct,
  database: DB,
): void {
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000.0);

  const { source, externalId } = parameters;
  database.query(
    "INSERT INTO products (productId, externalId, name, description, source, url, discount, price, ratingAverage, ratingCount, sold, stock, view, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      `${source}_${externalId}`, // we append source to prevent id collision!
      ...Object.values(parameters),
      timestamp,
      timestamp,
    ],
  );
}

export function updateProduct(
  {
    productId,
    ...parameters
  }: IUpdateProduct,
  database: DB,
): void {
  const date = new Date();
  const updatedAt = Math.floor(date.getTime() / 1000.0);

  let query = "UPDATE products SET ";

  query += generateKeyValueMap(parameters);
  query += ", updatedAt = ?";
  query += " WHERE productId = ?";

  database.query(
    query,
    [...Object.values(parameters), updatedAt, productId],
  );
}

export function getProductByProductId(
  { productId }: IGetProductByProductId,
  database: DB,
): ProductEntity {
  const getProductByProductIdQuery = database.prepareQuery<
    [
      string,
      string,
      string,
      string,
      number,
      string,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
    ]
  >(
    "SELECT productId, externalId, name, description, source, url, discount, price, ratingAverage, ratingCount, sold, stock, view, createdAt, updatedAt FROM products WHERE productId = ?",
  );
  const [
    _,
    externalId,
    name,
    description,
    source,
    url,
    discount,
    price,
    ratingAverage,
    ratingCount,
    sold,
    stock,
    view,
    createdAt,
    updatedAt,
  ] = getProductByProductIdQuery.one([productId]);
  getProductByProductIdQuery.finalize();

  const product = {
    productId,
    externalId: externalId,
    name,
    description,
    url,
    discount,
    price,
    ratingAverage,
    ratingCount,
    sold,
    stock,
    view,
    source,
    createdAt,
    updatedAt,
  };
  return product;
}
