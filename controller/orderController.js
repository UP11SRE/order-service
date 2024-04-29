// controllers/orderController.js
const orderService = require('../services/orderService');

async function placeOrder(req, res) {
  try {

    const {userId,role,email,productId, quantity } = req.body;
    //const userId = req.user.id; // Assuming user authentication provides userId
    console.log("checking", productId, quantity);
    const order = await orderService.placeOrder(productId, userId, quantity,email);
    res.status(201).json(order);
  } catch (error) {
    console.error("error", error.message);
    res.status(500).json({ message: 'Failed to place order' });
  }
}

async function getOrderStatus(req, res) {
  try {
     const userId = req.query;
     const role = req.query;
     const email = req.query;
    const orderId = req.query.orderId;
    const order = await orderService.getOrderStatus(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get order status' });
  }
}

async function getUserOrders(req, res) {
  try {
    userId,role,email
    
    const orders = await orderService.getUserOrders(userId);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get user orders' });
  }
}

async function cancelOder(req, res) {
    try {

    const  {userId,role, email} = req.body;
    const orderId = req.query.orderId;
      const res = await orderService.cancelOder(orderId);
      res.status(200).json(res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get user orders' });
    }
  }

module.exports = { placeOrder, getOrderStatus, getUserOrders, cancelOder };
