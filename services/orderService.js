// services/orderService.js
const { response } = require('express');
const orderRepository = require('../repository/orderRepository');
const {sendMessage} = require('../rabbitmq');

async function placeOrder(productId, userId, quantity,email) {

  const response = await axios.get(`http://localhost:8081/api/products/${productId}`, {
    
  });

  if(quantity < response.quantity){
    return {message : `only ${response.quantity} avilable`};
  }
  else{
    const order = await orderRepository.createOrder(productId, userId, quantity);
    const response = await axios.post(`http://localhost:8083/api/payment/payment`, {
      amnt : response.price, 
      email : email, 
      productId: productId,
      orderid: order.order_id
    
  });

  return response;

  }

  // Here, you can check if the quantity is available and handle partial availability
  // For simplicity, let's assume the quantity is always available
  //api call for the intercom service and check if product is avilable
}

async function getOrderStatus(orderId) {
  return await orderRepository.getOrderById(orderId);
}

async function getUserOrders(userId) {
  return await orderRepository.getOrderhistory(userId);
}

async function cancelOder(orderId) {
  const response = await orderRepository.cancelOder(orderId);

  sendMessage({
    action: 'orderCancelled',
    data: {
      product_id : response.product_id,
      charge_id : response.charge_id,
      amount : response.total_price,
    }
  });
   return {message : `order cancelled sucessfully`};
  }
  

module.exports = { placeOrder, getOrderStatus, getUserOrders, cancelOder };
