const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders.", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, items, sessionId } = req.body;
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({ customerName, customerEmail, customerPhone, items, total });

    if (sessionId) {
      await Cart.findOneAndUpdate({ sessionId }, { items: [], total: 0 }, { new: true, upsert: true });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: "Failed to create order.", error: error.message });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ message: "Order not found." });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "Failed to update order.", error: error.message });
  }
});

module.exports = router;
