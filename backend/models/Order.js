const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        defaultValue: function () {
            const date = new Date();
            const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
            const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
            return `ORD-${dateStr}-${random}`;
        }
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerEmail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customerPhone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    customerAddress: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    discountAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    taxAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    finalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Order Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'),
        defaultValue: 'Order Placed'
    },
    paymentStatus: {
        type: DataTypes.ENUM('Pending', 'Paid', 'Failed', 'Refunded'),
        defaultValue: 'Pending'
    },
    paymentMethod: {
        type: DataTypes.ENUM('Cash', 'Card', 'UPI', 'Net Banking', 'Other'),
        defaultValue: 'Cash'
    },
    deliveryDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productSku: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    }
}, {
    timestamps: false
});

// Relationships
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = { Order, OrderItem };
