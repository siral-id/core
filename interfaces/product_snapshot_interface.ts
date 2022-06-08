import { Source } from "../enum.ts";
import { ProductEntity } from "../entities.ts";

export interface ICreateProductSnapshot {
  product: ProductEntity;
  productName: string;
  productDescription: string;
  productSource: Source;
  productUrl: string;
  productDiscount: number;
  productPrice: number;
  productRatingAverage: number;
  productRatingCount: number;
  productSold: number;
  productStock: number;
  productView: number;
  productImage1: string;
  productImage2: string;
  productImage3: string;
}
