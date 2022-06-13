export enum Source {
  "SHOPEE" = 0,
  "TOKOPEDIA" = 1,
}

export enum Pipeline {
  ShopeeTrends = "WRITE_TRENDS_SHOPEE",
  TokopediaTrends = "WRITE_TRENDS_TOKOPEDIA",
  ShopeeProducts = "WRITE_PRODUCTS_SHOPEE",
  TokopediaProducts = "WRITE_PRODUCTS_TOKOPEDIA",
}
