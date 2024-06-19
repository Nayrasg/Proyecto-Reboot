const Order= require('../models/orders.model')
const bcrypt = require('bcrypt')
// Crear una nueva orden
const createOrder = async (req, res) => {
    try {
      const order = await Order.create(req.body);
      res.status(201).json({
        message: 'Orden creada',
        result: order,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error al crear orden',
        result: error,
      });
    }
  };
  
  // Obtener todas las órdenes
  const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.findAll();
      res.status(200).json({
        orders,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error al obtener órdenes',
        result: error,
      });
    }
  };
  
  // Obtener orden por ID
  const getOrderById = async (req, res) => {
    try {
      const order = await Order.findByPk(req.params.id);
      if (order) {
        res.status(200).json({
          order,
        });
      } else {
        res.status(404).json({
          message: 'Orden no encontrada',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error al obtener orden',
        result: error,
      });
    }
  };
  
  // Actualizar una orden
  const updateOrder = async (req, res) => {
    try {
      const order = await Order.findByPk(req.params.id);
      if (order) {
        await order.update(req.body);
        res.status(200).json({
          message: 'Orden actualizada',
          result: order,
        });
      } else {
        res.status(404).json({
          message: 'Orden no encontrada',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error al actualizar orden',
        result: error,
      });
    }
  };
  
  // Eliminar una orden
  const deleteOrder = async (req, res) => {
    try {
      const order = await Order.findByPk(req.params.id);
      if (order) {
        await order.destroy();
        res.status(200).json({
          message: 'Orden eliminada',
        });
      } else {
        res.status(404).json({
          message: 'Orden no encontrada',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error al eliminar orden',
        result: error,
      });
    }
  };
  
  module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
  };