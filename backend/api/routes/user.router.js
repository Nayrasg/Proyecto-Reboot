const router = require("express").Router()
/*
const {
  getAllUsers,
  getOneUser,
  getOwnProfile,
  createUser,
  updateOneUser,
  deleteOneUser
} = require('../controllers/user.controller')
*/

const {
    checkAuth,  // Middleware para comprobar autenticación. Obligamos al usuario a estar autenticado si empleamos este middleware, y lo aprovechamos para obtener la información del perfil de dicho usuario.
    checkAdmin  // Middleware para proteger determinadas rutas, y que solo puedan ser ejecutadas por un usuario administrador
  } = require('../middelwares')

  const { createUser, getAllUsers, getOneUser, updateOneUser, deleteOneUser } = require('../controllers/user.controller');
 
  
  router.post('', createUser); // Crear un nuevo usuario
  router.get('', getAllUsers); // Obtener todos los usuarios
  router.get('/:id', getOneUser); // Obtener usuario por ID
  router.put('/:id', updateOneUser); // Actualizar un usuario
  router.delete('/:id', deleteOneUser); // Eliminar un usuario
//router.get('/profile', checkAuth, getOwnProfile) // getOwnProfile requiere que el usuario esté logueado para realizar esta petición, ya que usamos el middleware de checkAuth



module.exports = router


/*
router.get('/', checkAuth, checkAdmin, getAllUsers) // getAllUsers solo podrá ser ejecutada por un administrador, ya que hemos empleados los middlewares de checkAuth y checkAdmin
router.get('/profile', checkAuth, getOwnProfile) // getOwnProfile requiere que el usuario esté logueado para realizar esta petición, ya que usamos el middleware de checkAuth
router.get('/:id', getOneUser)
router.put('/:id', updateOneUser)
router.delete('/:id', deleteOneUser)
*/

