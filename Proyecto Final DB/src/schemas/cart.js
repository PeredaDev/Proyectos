import { Schema, model } from "mongoose";

const productInCart = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  quantity: Number,
});

const cartSchema = Schema({
  products: [productInCart],
});

const cartModel = model("cart", cartSchema);

export default cartModel;
