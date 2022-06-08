import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { ICreateTrend } from "../mod.ts";

export function createTrend(
  { keyword, image, count, source }: ICreateTrend,
  database: DB,
): void {
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000.0);

  database.query(
    "INSERT INTO trends (keyword, image, count, source, timestamp) VALUES (?, ?, ?, ?, ?)",
    [
      keyword,
      image,
      count,
      source,
      timestamp,
    ],
  );
}
