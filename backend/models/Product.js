const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./Category');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    sku: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true
    },
    rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    finalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    inStock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    stockQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    minStockLevel: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    manufacturer: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expiryDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    batchNumber: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    timestamps: true,
    paranoid: true,
    hooks: {
        beforeValidate: (product) => {
            if (product.rate) {
                product.finalPrice = Math.max(0, product.rate - (product.discount || 0));
            }
        }
    }
});

// Define Relationships
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;
