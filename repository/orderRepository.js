// repositories/orderRepository.js
const Order = require('../entity/orderEntity');

async function createOrder(product_id, user_id) {
  return await Order.create({ product_id, user_id });
}

async function getOrderById(order_id) {
  return await Order.findByPk(order_id);
}

async function getOrderhistory(user_id) {
  return await Order.findAll({ where: { user_id: user_id } });
}
async function orderStatus(obj) {
  const order_id = obj.order_id;
  const charge_id = obj.charge_id;
  const total_price = obj.total_price;
  const status = obj.status;

  const details =  await Order.findByPk(order_id);
  details.charge_id = charge_id;
  details.total_price = total_price;
  details.status = status;

  await details.save();
}
async function refundSucessful(data) {
  const charge_id = data.charge_id;
  const refund_id = data.refund_id;
  const response =  await Order.findAll({ where: { charge_id: charge_id } });

  response.refund_id = refund_id;

  await response.save();
}

async function cancelOder(order_id){
    const details =  await Order.findByPk(order_id);

    details.status = 'cancelled';

    await details.save();

    return details;
}

module.exports = { createOrder, refundSucessful,orderStatus,getOrderById, getOrderhistory, cancelOder };
