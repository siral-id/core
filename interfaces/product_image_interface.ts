import { ProductEntity } from "../entities.ts";

export interface ICreateProductImage {
  image: string;
  product: ProductEntity;
}

export interface IUpdateProductImage {
  productImageId: number;
  image: string;
}

export interface IGetProductImagesByProduct {
  product: ProductEntity;
}
