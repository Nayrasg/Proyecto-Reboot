const { DataTypes } = require("sequelize")
const { connection } = require('../../database') // Instancia de la conexión generado en el archivo index.js de la carpeta database

const Users = connection.define('users', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rol: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    document_id: {
      type: DataTypes.STRING(25),
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(250),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    province: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    street: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    street_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    url_profile_picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false
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
    },
  {
    timestamps: false // Indicamos que no queremos generar las columnas de 'fecha de creación' ni de 'fecha de última actualización'
  }
)

module.exports = User