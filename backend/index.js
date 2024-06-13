require("dotenv").config() // Requerimos dotenv en el archivo principal para poder emplear variables de entorno en todo el proyecto (process.env)
const express = require('express')
const defineRelations = require('./database/relaciones')


const {checkConnection,syncModels} = require('./database')

const startDB = async () => {
    await checkDB()          // 1. Comprobar conexión
    await defineRelations()  // 2. Importar modelos y definir sus relaciones
    syncModels()             // 3. Sincronizar modelos con la base de datos
  }