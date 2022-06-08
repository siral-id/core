import { DB } from "https://deno.land/x/sqlite/mod.ts";
import {
  productImageSchema,
  productSchema,
  productSnapshotSchema,
  trendSchema,
} from "./schema.ts";

const getDatabase = () => {
  const db = new DB("siral.db");
  db.query(trendSchema);
  db.query(productSchema);
  db.query(productImageSchema);
  db.query(productSnapshotSchema);
  return db;
}

export { getDatabase };
