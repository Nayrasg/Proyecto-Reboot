const { DataTypes } = require("sequelize")
const { connection } = require('../../database') // Instancia de la conexión generado en el archivo index.js de la carpeta database



const ProductCards = connection.define('ProductCard', {
  product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  vendor: {
      type: DataTypes.INTEGER,
  },
  title: {
      type: DataTypes.STRING(250),
      allowNull: false,
  },
  description: {
      type: DataTypes.STRING(250),
  },
  image: {
      type: DataTypes.STRING(250),
  },
  price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
  },
  create_date: {
      type: DataTypes.DATE,
  },
  S: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
  },
  M: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
  },
  L: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
  },
  XL: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
  }
}, {
    tableName: 'product_cards',
    timestamps: false, // Si no quieres que Sequelize maneje createdAt y updatedAt
});

module.exports = ProductCards;
