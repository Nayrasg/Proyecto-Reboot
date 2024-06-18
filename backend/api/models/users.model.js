const { DataTypes } = require("sequelize")
const { connection } = require('../../database') // Instancia de la conexión generado en el archivo index.js de la carpeta database

const User = connection.define('User', {
  user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  rol: {
      type: DataTypes.ENUM('cliente', 'vendedor', 'admin'),
      defaultValue: 'cliente',
  },
  name: {
      type: DataTypes.STRING(250),
  },
  password: {
      type: DataTypes.STRING(250),
      allowNull: false,
  },
  surname: {
      type: DataTypes.STRING(250),
  },
  document_id: {
      type: DataTypes.STRING(25),
      unique: true,
  },
  email: {
      type: DataTypes.STRING(250),
      unique: true,
      allowNull: false,
  },
  phone: {
      type: DataTypes.STRING(20),
  },
  province: {
      type: DataTypes.STRING(250),
  },
  location: {
      type: DataTypes.STRING(250),
  },
  street: {
      type: DataTypes.STRING(250),
  },
  street_number: {
      type: DataTypes.INTEGER,
  },
  floor: {
      type: DataTypes.INTEGER,
  },
  url_profile_picture: {
      type: DataTypes.STRING(255),
  },
  birth_date: {
      type: DataTypes.DATE,
  },
  file_pdf: {
      type: DataTypes.STRING(250),
  }
}, {
  tableName: 'users',
  timestamps: false, // Si no quieres que Sequelize maneje createdAt y updatedAt
});

module.exports = User;