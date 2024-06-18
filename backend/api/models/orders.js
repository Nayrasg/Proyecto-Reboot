const { DataTypes } = require("sequelize")
const { connection } = require('../../database') 


const Orders = connection.define('Order', {
  order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  user_id: {
      type: DataTypes.INTEGER,
  },
  vendor: {
      type: DataTypes.INTEGER,
  },
  order_status: {
      type: DataTypes.ENUM('procesando', 'enviado', 'entregado'),
      defaultValue: 'procesando',
  },
  order_date: {
      type: DataTypes.DATE,
  },
  shipping_cost: {
      type: DataTypes.DECIMAL(10, 2),
  },
  taxes: {
      type: DataTypes.DECIMAL(10, 2),
  },
  total_order: {
      type: DataTypes.DECIMAL(10, 2),
  }
}, {
  tableName: 'order', // Especifica explícitamente el nombre de la tabla en singular
  timestamps: false, // Si no quieres que Sequelize maneje createdAt y updatedAt
});

module.exports = Orders;
