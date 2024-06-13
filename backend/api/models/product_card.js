const { DataTypes } = require("sequelize")
const { connection } = require('../../database') // Instancia de la conexión generado en el archivo index.js de la carpeta database



const ProductCard = connection.define('product_card', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  seller_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sellers',
      key: 'seller_id'
    }
  },
  name_product: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  url_product_picture: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  final_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  size_s: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  size_m: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  size_l: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  size_xl: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  timestamps: false // Para desactivar el comportamiento automático de timestamps de Sequelize
});

module.exports = ProductCard;
