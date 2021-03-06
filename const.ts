import { Pipeline } from "./enum.ts";

export const DB_URL =
  "https://github.com/siral-id/core/blob/main/siral.db?raw=true";
export const DB_FILENAME = "siral.db";

export const Repositories = {
  [Pipeline.ShopeeTrends]: "core",
  [Pipeline.TokopediaTrends]: "core",
  [Pipeline.ShopeeProducts]: "core",
  [Pipeline.TokopediaProducts]: "core",
  [Pipeline.ForwardShopeeTrends]: "shopee-id-products",
  [Pipeline.ForwardTokopediaTrends]: "tokopedia-products",
};
