import { DB } from "https://deno.land/x/sqlite/mod.ts";
import {
  productImageSchema,
  productSchema,
  productSnapshotSchema,
  trendSchema,
} from "./schema.ts";
import { DB_FILENAME } from "../const.ts";

const getDatabase = () => {
  const db = new DB(DB_FILENAME);
  db.query(trendSchema);
  db.query(productSchema);
  db.query(productImageSchema);
  db.query(productSnapshotSchema);
  return db;
};

export { getDatabase };
