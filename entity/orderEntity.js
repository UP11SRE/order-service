// models/order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../client/sequelize');

const orderEntity = sequelize.define('order_details', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue : 'pending'
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  shipping_address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  charge_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  refund_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  timestamps: false // Disable sequelize auto-timestamps as we are managing them manually
});

module.exports = orderEntity;
