const User = require('../models/users.model')
const bcrypt = require('bcrypt')

/*
getAllUsers,
  getOneUser,
  getOwnProfile,
  createUser,
  updateOneUser,
  deleteOneUser
*/

const createUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALTS))
        req.body.password = bcrypt.hashSync(req.body.password, salt)
        const user = await User.create(req.body)
        res.status(201).json({
            message: 'Usuario creado',
            result: user
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al creando usuario',
            result: error
        })
    }
}



const getOwnProfile = async (req, res) => {
    try {
        const user = await User.getOwnProfile(req.body)
        
        res.status(201).json({
            message: 'Perfil de usuario',
            result: user
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al creando usuario',
            result: error
        })
    }
}

module.exports = {createUser,getOwnProfile}