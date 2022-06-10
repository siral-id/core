import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";
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

export function getUniqueTrends(
  database: DB,
): string[] {
  const uniqueTrends: string[] = [];
  const query = database.prepareQuery<[string]>(
    "SELECT DISTINCT keyword FROM trends",
  );
  for (const [keyword] of query.iter()) {
    uniqueTrends.push(keyword);
  }
  query.finalize();
  return uniqueTrends;
}
