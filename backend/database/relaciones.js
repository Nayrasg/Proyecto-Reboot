const Users = require('../api/models/users.model');
const Sellers = require('../api/models/sellers.model');
const Orders = require('../api/models/orders');
const ProductCard = require('../api/models/product_card');
const OrdersProducts = require('../api/models/orders_products');

const defineRelations = async () => {
// Users has many Orders
Users.hasMany(Orders, {
  foreignKey: 'user_id'
})
Orders.belongsTo(Users, {
  foreignKey: 'user_id'
})

// Sellers has many Orders
Sellers.hasMany(Orders, {
  foreignKey: 'seller_id'
})
Orders.belongsTo(Sellers, {
  foreignKey: 'seller_id'
})

// Sellers has many ProductCards
Sellers.hasMany(ProductCard, {
  foreignKey: 'seller_id'
})
ProductCard.belongsTo(Sellers, {
  foreignKey: 'seller_id'
})

// Orders has many OrdersProducts
Orders.hasMany(OrdersProducts, {
  foreignKey: 'order_id'
})
OrdersProducts.belongsTo(Orders, {
  foreignKey: 'order_id'
})

// ProductCard has many OrdersProducts
ProductCard.hasMany(OrdersProducts, {
  foreignKey: 'product_id'
})
OrdersProducts.belongsTo(ProductCard, {
  foreignKey: 'product_id'
})
}
/*
module.exports = {
  Users,
  Sellers,
  Orders,
  ProductCard,
  OrdersProducts
};
*/

module.exports = defineRelations