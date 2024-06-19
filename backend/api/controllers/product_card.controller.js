const ProductCard = require('../models/product_cards.model');
const bcrypt = require('bcrypt')


// Crear un nuevo producto
const createProductCard = async (req, res) => {
  try {
    const productCard = await ProductCard.create(req.body);
    res.status(201).json({
      message: 'Producto creado',
      result: productCard,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al crear producto',
      result: error,
    });
  }
};

// Obtener todos los productos
const getAllProductCards = async (req, res) => {
  try {
    const productCards = await ProductCard.findAll();
    res.status(200).json({
      product_cards: productCards,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al obtener productos',
      result: error,
    });
  }
};

// Obtener producto por ID
const getProductCardById = async (req, res) => {
  try {
    const productCard = await ProductCard.findByPk(req.params.id);
    if (productCard) {
      res.status(200).json({
        product_card: productCard,
      });
    } else {
      res.status(404).json({
        message: 'Producto no encontrado',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al obtener producto',
      result: error,
    });
  }
};

// Actualizar un producto
const updateProductCard = async (req, res) => {
  try {
    const productCard = await ProductCard.findByPk(req.params.id);
    if (productCard) {
      await productCard.update(req.body);
      res.status(200).json({
        message: 'Producto actualizado',
        result: productCard,
      });
    } else {
      res.status(404).json({
        message: 'Producto no encontrado',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al actualizar producto',
      result: error,
    });
  }
};

// Eliminar un producto
const deleteProductCard = async (req, res) => {
  try {
    const productCard = await ProductCard.findByPk(req.params.id);
    if (productCard) {
      await productCard.destroy();
      res.status(200).json({
        message: 'Producto eliminado',
      });
    } else {
      res.status(404).json({
        message: 'Producto no encontrado',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al eliminar producto',
      result: error,
    });
  }
};

module.exports = {
  createProductCard,
  getAllProductCards,
  getProductCardById,
  updateProductCard,
  deleteProductCard,
};
