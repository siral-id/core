import { Source } from "../enum.ts";

export interface ICreateProduct {
  externalId: string;
  name: string;
  description: string;
  source: Source;
  url: string;
  discount: number;
  price: number;
  ratingAverage: number;
  ratingCount: number;
  sold: number;
  stock: number;
  view: number;
}

export interface IUpdateProduct {
  productId: string;
  externalId?: string;
  name?: string;
  description?: string;
  source?: Source;
  url?: string;
  discount?: number;
  price?: number;
  ratingAverage?: number;
  ratingCount?: number;
  sold?: number;
  stock?: number;
  view?: number;
}

export interface IGetProductByProductId {
  productId: string;
}
