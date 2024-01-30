const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const Object_id = mongodb.Object_id;

class User {
  constructor(username, email, cart, _id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this.__id = _id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.product_id.toString() === product.__id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        product_id: new Object_id(product.__id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { __id: new Object_id(this.__id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const product_ids = this.cart.items.map((i) => {
      return i.product_id;
    });
    return db
      .collection("products")
      .find({ __id: { $in: product_ids } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.product_id.toString() === p.__id.toString();
            }).quantity,
          };
        });
      });
  }

  deleteItemFromCart(product_id) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.product_id.toString() !== product_id.toString();
    });
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { __id: new Object_id(this.__id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            __id: new Object_id(this.__id),
            name: this.name,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { __id: new Object_id(this.__id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    const db = getDB();
    // return db.collection('orders').
  }

  static findBy_id(user_id) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ __id: new Object_id(user_id) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
