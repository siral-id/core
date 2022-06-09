// import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";
import {
  productImageSchema,
  productSchema,
  productSnapshotSchema,
  trendSchema,
} from "../db/mod.ts";

export function bootstrapDB(): DB {
  const db = new DB();
  db.query(trendSchema);
  db.query(productSchema);
  db.query(productImageSchema);
  db.query(productSnapshotSchema);
  return db;
}

export function shutdownDB(db: DB): void {
  db.query(
    `DROP TABLE trends; DROP TABLE product_images; DROP TABLE product_Snapshots; DROP TABLE products;`,
  );
  db.close();
}
