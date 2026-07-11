const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

router.get("/:sessionId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) return res.json({ sessionId: req.params.sessionId, items: [], total: 0 });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart.", error: error.message });
  }
});

router.put("/:sessionId", async (req, res) => {
  try {
    const items = req.body.items || [];
    let cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) cart = new Cart({ sessionId: req.params.sessionId, items });
    else cart.items = items;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: "Failed to save cart.", error: error.message });
  }
});

router.delete("/:sessionId", async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { items: [], total: 0 },
      { new: true, upsert: true }
    );
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: "Failed to clear cart.", error: error.message });
  }
});

module.exports = router;
