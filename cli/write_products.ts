import {
  createProduct,
  createProductImage,
  createProductSnapshot,
  getDatabase,
  getProductByProductId,
  // updateProductImage,
  ICreateProductWithImages,
  updateProduct,
} from "../mod.ts";

const rawJson = Deno.args[0];
const recordsToBeInserted: ICreateProductWithImages[] = JSON.parse(rawJson);

const db = getDatabase();

recordsToBeInserted.map(({
  externalId,
  name,
  description,
  source,
  url,
  discount,
  price,
  ratingAverage,
  ratingCount,
  sold,
  stock,
  view,
  images,
}) => {
  // check whether we have this product or not
  const productId = `${source}_${externalId}`;

  let product;
  try {
    product = getProductByProductId({ productId }, db);

    updateProduct({
      productId,
      externalId,
      name,
      description,
      source,
      url,
      discount,
      price,
      ratingAverage,
      ratingCount,
      sold,
      stock,
      view,
    }, db);

    // images.map((image) => updateProductImage({ image, productId }, db));

    createProductSnapshot({
      productName: name,
      productDescription: description,
      productSource: source,
      productUrl: url,
      productDiscount: discount,
      productPrice: price,
      productRatingAverage: ratingAverage,
      productRatingCount: ratingCount,
      productSold: sold,
      productStock: stock,
      productView: view,
      product,
      productImages: images,
    }, db);
  } catch {
    createProduct({
      externalId,
      name,
      description,
      source,
      url,
      discount,
      price,
      ratingAverage,
      ratingCount,
      sold,
      stock,
      view,
    }, db);

    const productId = `${source}_${externalId}`;
    const product = getProductByProductId({ productId }, db);
    images.map((image) => createProductImage({ image, product }, db));

    createProductSnapshot({
      productName: name,
      productDescription: description,
      productSource: source,
      productUrl: url,
      productDiscount: discount,
      productPrice: price,
      productRatingAverage: ratingAverage,
      productRatingCount: ratingCount,
      productSold: sold,
      productStock: stock,
      productView: view,
      product,
      productImages: images,
    }, db);
  }
});
