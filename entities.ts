import { Source } from "./enum.ts";

export class TrendEntity {
  trendId!: number;
  keyword!: string;
  image!: string;
  count!: number;
  source!: Source;
  timestamp!: string;
}

export class ProductEntity {
  productId!: string;
  externalId!: string;
  name!: string;
  description!: string;
  source!: Source;
  url!: string;
  discount!: number;
  price!: number;
  ratingAverage!: number;
  ratingCount!: number;
  sold!: number;
  stock!: number;
  view!: number;
  createdAt!: number;
  updatedAt!: number;
}

export class ProductImageEntity {
  productImageId!: number;
  image!: string;
  createdAt!: number;
  updatedAt!: number;
}

export class ProductSnapshotEntity {
  productSnapshotId!: number;
  productName!: string;
  productDescription!: string;
  productSource!: Source;
  productUrl!: string;
  productDiscount!: number;
  productPrice!: number;
  productRatingAverage!: number;
  productRatingCount!: number;
  productSold!: number;
  productStock!: number;
  productView!: number;
  productImages!: string[];
  createdAt!: number;
  updatedAt!: number;
}
