

const router = require("express").Router()

const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/order.controller');

router.post('', createOrder); // Crear una nueva orden
router.get('', getAllOrders); // Obtener todas las órdenes
router.get('/:id', getOrderById); // Obtener orden por ID
router.put('/:id', updateOrder); // Actualizar una orden
router.delete('/:id', deleteOrder); // Eliminar una orden

module.exports = router;