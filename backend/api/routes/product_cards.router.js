
const router = require("express").Router()
const { createProductCard, getAllProductCards, getProductCardById, updateProductCard, deleteProductCard } = require('../controllers/product_card.controller');


router.post('', createProductCard); // Crear un nuevo producto
router.get('', getAllProductCards); // Obtener todos los productos
router.get('/:id', getProductCardById); // Obtener producto por ID
router.put('/:id', updateProductCard); // Actualizar un producto
router.delete('/:id', deleteProductCard); // Eliminar un producto

module.exports = router
