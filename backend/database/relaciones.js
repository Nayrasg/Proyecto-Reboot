const Users = require('../api/models/users.model');
const Orders = require('../api/models/orders.model');
const ProductCards = require('../api/models/product_cards.model');
const OrdersItems = require('../api/models/orderItems.model');

const defineRelations = async () => {
// Relación entre Users y Orders (cliente)
Users.hasMany(Orders, {
  foreignKey: 'user_id',
  as: 'orders',
});
Orders.belongsTo(Users, {
  foreignKey: 'user_id',
  as: 'customer',
});

// Relación entre Users y Orders (vendedor)
Users.hasMany(Orders, {
  foreignKey: 'vendor',
  as: 'seller_orders',
});
Orders.belongsTo(Users, {
  foreignKey: 'vendor',
  as: 'seller',
});

// Relación entre Orders y OrdersItems
Orders.hasMany(OrdersItems, {
  foreignKey: 'order_id',
  as: 'order_items',
});
OrdersItems.belongsTo(Orders, {
  foreignKey: 'order_id',
  as: 'order',
});

// Relación entre ProductCards y OrdersItems
ProductCards.hasMany(OrdersItems, {
  foreignKey: 'product_id',
  as: 'order_items',
});
OrdersItems.belongsTo(ProductCards, {
  foreignKey: 'product_id',
  as: 'product_card',
});

// Relación entre ProductCards y Users (seller)
ProductCards.belongsTo(Users, {
  foreignKey: 'vendor',
  as: 'seller',
});
Users.hasMany(ProductCards, {
  foreignKey: 'vendor',
  as: 'products',
});
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