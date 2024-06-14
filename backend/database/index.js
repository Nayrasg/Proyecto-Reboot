const { Sequelize } = require('sequelize')

require('dotenv').config()


const connection = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: process.env.DIALECT,
	port: process.env.DB_PORT,
	logging: false
})

async function checkConnection() {
	try {
		await connection.authenticate()
		console.log('Connection to DB has been established successfully.')
	} catch (error) {
		console.error('Imposible conectar a la base de datos.')
		console.error(error)
	}
}

async function syncModels(value) {
	const state = {
		alter: { alter: true },
		force: { force: true },
	}
	try {
		await connection.sync(state[value] || '')
		//await connection.sync()
		/*console.log(`All models were synchronized successfully using sync(${JSON.stringify(state[value]) || ''}).`)*/
		console.log('Modelos sincronizados')
	} catch (error) {
		console.error("Imposible sincronizar los modelos")
		console.error(error)
	}
}

module.exports = { connection, checkConnection, syncModels }
