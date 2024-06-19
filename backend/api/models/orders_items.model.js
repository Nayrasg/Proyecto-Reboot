const { DataTypes } = require("sequelize")
const { connection } = require('../../database') 


const OrdersItems = connection.define('OrdersItems', {
  order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  },
  product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  },
  quantity: {
      type: DataTypes.INTEGER,
  },
  size: {
      type: DataTypes.STRING(3),
  },
  product_price: {
      type: DataTypes.INTEGER,
  },
  order_total_price: {
      type: DataTypes.INTEGER,
  }
}, {
    tableName: 'order_items',
  timestamps: false, // Si no quieres que Sequelize maneje createdAt y updatedAt
  indexes: [
      {
          unique: true,
          fields: ['order_id', 'product_id']
      }
  ]
});

module.exports = OrdersItems;