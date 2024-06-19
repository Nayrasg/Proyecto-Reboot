const express = require('express');
const router = express.Router();

const {
    createOrderItem,
    getAllOrderItems,
    getOneOrderItem,
    updateOrderItem,
    deleteOrderItem
} = require('../controllers/orderItems.controller');

// Middleware to check roles can be added here


router.post('', createOrderItem);
router.get('', getAllOrderItems);
router.get('/:order_id/:product_id', getOneOrderItem);
router.put('/:order_id/:product_id', updateOrderItem);
router.delete('/:order_id/:product_id', deleteOrderItem);

module.exports = router;