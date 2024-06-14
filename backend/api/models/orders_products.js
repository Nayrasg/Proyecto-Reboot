const { DataTypes } = require("sequelize")
const { connection } = require('../../database') 


const OrdersProducts = connection.define('orders_products', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'orders',
      key: 'order_id'
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'product_cards',
      key: 'product_id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  size: {
    type: DataTypes.STRING(3),
    allowNull: false
  }
}, {
  timestamps: false // Para desactivar el comportamiento automático de timestamps de Sequelize
});

module.exports = OrdersProducts;
