const Wallet = require('../Model/index');
const Order = require('../Model/Order');

// Create Order
const createOrder = async (req, res) => {
  try {
    const client_id = req.headers['client-id'];
    const { amount } = req.body;

    if (!client_id) return res.status(400).json({ error: "client-id header required" });
    if (!amount || amount <= 0) return res.status(400).json({ error: "Valid amount required" });

    const wallet = await Wallet.findOne({ client_id });
    if (!wallet) return res.status(404).json({ error: "Wallet not found" });

    if (wallet.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Deduct wallet balance atomically
    wallet.balance -= amount;
    await wallet.save();

    // Create order
    const order = new Order({ client_id, amount });
    await order.save();

    // Mock fulfillment (replace with real API call)
    order.fulfillment_id = `FULFILL_${Date.now()}`;
    order.status = "SUCCESS";
    await order.save();

    return res.status(201).json({ order });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get Order Details
const getOrder = async (req, res) => {
  try {
    const client_id = req.headers['client-id'];
    const { order_id } = req.params;

    if (!client_id) return res.status(400).json({ error: "client-id header required" });

    const order = await Order.findOne({ _id: order_id, client_id });
    if (!order) return res.status(404).json({ error: "Order not found" });

    return res.status(200).json({ order });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createOrder, getOrder };
