import { Pipeline } from "./enum.ts";

export const DB_URL =
  "https://github.com/siral-id/core/blob/main/siral.db?raw=true";
export const DB_FILENAME = "siral.db";

export const Repositories = {
  [Pipeline.ShopeeTrends]: "shopee-id-trends",
  [Pipeline.TokopediaTrends]: "tokopedia-trends",
  [Pipeline.ShopeeProducts]: "shopee-id-products",
  [Pipeline.TokopediaProducts]: "tokopedia-products",
};
