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

const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        where: req.query // Permitimos filtrar usuarios pasando una query desde el cliente. Si no se pasa ninguna query, devolverá a todos los usuarios
      })
  
      if (!users) {
        res.status(404).json({
          message: 'No users found',
          result: users
        })
      }
  
      res.status(200).json({
        message: "All Users fetched",
        result: users,
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error getting all users",
        result: error,
      });
    }
  }


  const getOneUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.status(200).json({
          user,
        });
      } else {
        res.status(404).json({
          message: 'Usuario no encontrado',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error al obtener usuario',
        result: error,
      });
    }
  };

// Eliminar un usuario
const deleteOneUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(200).json({
        message: 'Usuario eliminado',
      });
    } else {
      res.status(404).json({
        message: 'Usuario no encontrado',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al eliminar usuario',
      result: error,
    });
  }
};

// Actualizar un usuario
const updateOneUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.status(200).json({
        message: 'Usuario actualizado',
        result: user,
      });
    } else {
      res.status(404).json({
        message: 'Usuario no encontrado',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al actualizar usuario',
      result: error,
    });
  }
};
module.exports = {
  createUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  deleteOneUser,
};

