require("dotenv").config() // Requerimos dotenv en el archivo principal para poder emplear variables de entorno en todo el proyecto (process.env)
const express = require('express')
const defineRelations = require('./database/relaciones')
const { checkConnection, syncModels } = require('./database')
const morgan = require('morgan')
const startDB = async () => {
  await checkConnection()          // 1. Comprobar conexión
  await defineRelations()  // 2. Importar modelos y definir sus relaciones
  syncModels()             // 3. Sincronizar modelos con la base de datos
  //NOTA si hago cambios en la estructura de la tabla o relaciones hay que poner "alter" para
  // que modifique la estructura en el mysql
  //syncModels('alter')             // 3. Sincronizar modelos con la base de datos
}
const router = require("./api/routes") // Instancia del router principal, alojado en /api/routes/index.js
const app = express()

app.listen(process.env.PORT, () => {
  console.log(`Server started! Listening on port ${process.env.PORT}`)
  startDB() // Iniciamos la conexión al servidor una vez nuestro servidor esté arrancado y esperando peticiones
})
app.use(morgan('dev'))
app.use('/api', router) // Cualquier petición que llegue empezando con '/api' empleará el router principal importado en la línea 14











/*
ESTO SE PODRIA HACER ASI PARA TENER EL CÓDIGO MAS LIMPIO
ESTO ES ASÍ PORQUE javascript concatena una detrás de otras las llamadas.
const app = express()
.use(morgan('dev'))
.get('/', (req,res) => {
  res.status(200).send('Express working')
})
.listen(process.env.PORT, () => {
  console.log(`Server started! Listening on port ${process.env.PORT}`)
  startDB() // Iniciamos la conexión al servidor una vez nuestro servidor esté arrancado y esperando peticiones
})


*/
/*
const router = require("./api/routes") // Instancia del router principal, alojado en /api/routes/index.js

const app = express()
app.use(express.json()) // Le damos la capacidad a nuestra api de traducir los JSON que reciba en las peticiones a un objeto de javascript
app.use(morgan('dev'))

app.use('/api', router) // Cualquier petición que llegue empezando con '/api' empleará el router principal importado en la línea 14

app.listen(process.env.PORT, () => {
  console.log(`Server started! Listening on port ${process.env.PORT}`)
  startDB() // Iniciamos la conexión al servidor una vez nuestro servidor esté arrancado y esperando peticiones
})
*/  
  
