// Models initialization file
// Loads all models and sets up relationships

const Admin = require('./Admin');
const Category = require('./Category');
const Product = require('./Product');
const Customer = require('./Customer');
const Order = require('./Order');
const OrderItem = require('./Order').OrderItem; // Assuming OrderItem is exported from Order
const Supplier = require('./Supplier');
const ActivityLog = require('./ActivityLog');

// Export all models for use in other files
module.exports = {
    Admin,
    Category,
    Product,
    Customer,
    Order,
    OrderItem,
    Supplier,
    ActivityLog,
};
