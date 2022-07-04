import {
  createProduct,
  createProductImage,
  createProductSnapshot,
  getDatabase,
  getProductByProductId,
  // updateProductImage,
  ICreateProductWithImages,
  setupOctokit,
  updateProduct,
} from "../mod.ts";

import { readJSONFromURL } from "https://deno.land/x/flat/mod.ts";

const ghToken = Deno.env.get("GH_TOKEN");
const octokit = setupOctokit(ghToken);

// The filename is the first invocation argument
const argument = Deno.args[0]; // Same name as downloaded_filename

const gistToBeRead: string[] = JSON.parse(argument);
console.log(gistToBeRead);

const gists = await Promise.all(
  gistToBeRead.map(async (gistId) =>
    await octokit.request("GET /gists/{gist_id}", {
      gist_id: gistId,
    })
  ),
);
console.log(gists);

const db = getDatabase();

await Promise.all(gists.map(async ({ data: { id } }) => {
  //https://gist.githubusercontent.com/vousmeevoyez/dfaaad7bbc64d9841618d8cf76405e97/raw/data.json
  const gistUrl =
    `https://gist.githubusercontent.com/vousmeevoyez/${id}/raw/upload.json`;

  const recordsToBeInserted: ICreateProductWithImages[] = await readJSONFromURL(
    gistUrl,
  );

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
}));

await Promise.all(
  gistToBeRead.map(async (gistId) =>
    await octokit.request("DELETE /gists/{gist_id}", {
      gist_id: gistId,
    })
  ),
);

Deno.exit();
