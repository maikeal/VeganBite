const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    items: [cartItemSchema],
    total: { type: Number, default: 0 }
  },
  { timestamps: true }
);

cartSchema.pre("save", function calculateTotal(next) {
  this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
