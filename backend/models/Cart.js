const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number },
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Cart", CartSchema);
