import { Schema, model } from "mongoose";

const productInTicket = new Schema({
    _id: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    quantity: Number,
  });

const ticketSchema = new Schema({
    purchase_time: {
        type: Date,
        required: true
    },
    purchaser: {
        type: String,
        index: true,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    products: [productInTicket]
})

const ticketModel = model("ticket", ticketSchema)

export default ticketModel
