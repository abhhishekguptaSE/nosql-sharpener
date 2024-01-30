const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// class Product {
//   constructor(title, price, description, imageUrl, _id, user_id) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this.__id = _id ? new mongodb.Object_id(_id) : null;
//     this.user_id = user_id;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this.__id) {
//       // Update the product
//       dbOp = db
//         .collection("products")
//         .updateOne({ __id: this.__id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findBy_id(prod_id) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ __id: new mongodb.Object_id(prod_id) })
//       .next()
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static deleteBy_id(prod_id) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ __id: new mongodb.Object_id(prod_id) })
//       .then((result) => {
//         console.log("Deleted");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
