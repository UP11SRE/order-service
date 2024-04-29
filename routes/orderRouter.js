// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');


router.post('/placeorder', orderController.placeOrder);
router.get('/:orderId', orderController.getOrderStatus);
router.get('/history',  orderController.getUserOrders);
router.post('/cancel/:orderId', orderController.cancelOder);

module.exports = router;
