const Users = require('../models/users.model')
const bcrypt = require('bcrypt')

const createUser = (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            message: 'Error al creando usuario',
            result: error
        })
    }
}