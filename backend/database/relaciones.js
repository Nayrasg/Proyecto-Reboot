const Users = require('../api/models/users.model');
const Sellers = require('../api/models/sellers.model');
const Orders = require('../api/models/orders');
const ProductCards = require('../api/models/product_cards');
const OrdersProducts = require('../api/models/orders_products');

const defineRelations = async () => {
//1 a 1 , un vendedor solo puede pertenecer aun usuario y un usuario solo puede tener un vendedor
Users.hasOne(Sellers, { foreignKey: 'user_id' });
Sellers.belongsTo(Users, { foreignKey: 'user_id' });

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
Sellers.hasMany(ProductCards, {
  foreignKey: 'seller_id'
})
ProductCards.belongsTo(Sellers, {
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
ProductCards.hasMany(OrdersProducts, {
  foreignKey: 'product_id'
})
OrdersProducts.belongsTo(ProductCards, {
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