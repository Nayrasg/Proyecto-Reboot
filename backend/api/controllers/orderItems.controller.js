const OrdersItems = require('../models/orderItems.model');
const bcrypt = require('bcrypt')

const createOrderItem = async (req, res) => {
    try {
        const orderItem = await OrdersItems.create(req.body);
        res.status(201).json({
            message: 'Order item created successfully',
            result: orderItem
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating order item',
            result: error
        });
    }
};

const getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrdersItems.findAll();
        res.status(200).json(orderItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching order items',
            result: error
        });
    }
};

const getOneOrderItem = async (req, res) => {
    try {
        const { order_id, product_id } = req.params;
        const orderItem = await OrdersItems.findOne({
            where: { order_id, product_id }
        });
        if (orderItem) {
            res.status(200).json(orderItem);
        } else {
            res.status(404).json({
                message: 'Order item not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching order item',
            result: error
        });
    }
};

const updateOrderItem = async (req, res) => {
    try {
        const { order_id, product_id } = req.params;
        const updated = await OrdersItems.update(req.body, {
            where: { order_id, product_id }
        });
        if (updated[0] === 1) {
            res.status(200).json({
                message: 'Order item updated successfully'
            });
        } else {
            res.status(404).json({
                message: 'Order item not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error updating order item',
            result: error
        });
    }
};

const deleteOrderItem = async (req, res) => {
    try {
        const { order_id, product_id } = req.params;
        const deleted = await OrdersItems.destroy({
            where: { order_id, product_id }
        });
        if (deleted) {
            res.status(200).json({
                message: 'Order item deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'Order item not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error deleting order item',
            result: error
        });
    }
};

module.exports = {
    createOrderItem,
    getAllOrderItems,
    getOneOrderItem,
    updateOrderItem,
    deleteOrderItem
};