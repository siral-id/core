export const trendSchema = `
  CREATE TABLE IF NOT EXISTS trends (
    trendId INTEGER PRIMARY KEY AUTOINCREMENT,
    keyword TEXT NOT NULL,
    image TEXT NOT NULL,
    count INTEGER NOT NULL,
    source INTEGER NOT NULL,
    timestamp INTEGER NOT NULL
  )
`;
export const productSchema = `
  CREATE TABLE IF NOT EXISTS products (
    productId TEXT PRIMARY KEY,
    externalId TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    source INTEGER NOT NULL,
    url TEXT NOT NULL UNIQUE,
    discount REAL NOT NULL,
    price INTEGER NOT NULL,
    ratingAverage REAL NOT NULL,
    ratingCount INT NOT NULL,
    sold INT NOT NULL,
    stock INT NOT NULL,
    view INT NOT NULL,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL
  )
`;

export const productImageSchema = `
  CREATE TABLE IF NOT EXISTS product_images (
    productImageId INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT NOT NULL,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    FOREIGN KEY(productId) REFERENCES products(productId)
  )
`;

export const productSnapshotSchema = `
  CREATE TABLE IF NOT EXISTS product_Snapshots (
    productSnapshotId INTEGER PRIMARY KEY AUTOINCREMENT,
    productName TEXT NOT NULL,
    productDescription TEXT NOT NULL,
    productSource INT NOT NULL,
    productUrl TEXT NOT NULL,
    productDiscount REAL NOT NULL,
    productPrice INTEGER NOT NULL,
    productRatingAverage REAL NOT NULL,
    productRatingCount INT NOT NULL,
    productSold INT NOT NULL,
    productStock INT NOT NULL,
    productView INT NOT NULL,
    productImage1 TEXT,
    productImage2 TEXT,
    productImage3 TEXT,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    FOREIGN KEY(productId) REFERENCES products(productId)
  )
`;
