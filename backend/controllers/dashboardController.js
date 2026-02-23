const Product = require('../models/Product');
const { Order } = require('../models/Order');
const Category = require('../models/Category');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const totalProducts = await Product.count({ where: { deletedAt: null } });
        const totalOrders = await Order.count();
        const totalCategories = await Category.count({ where: { deletedAt: null } });

        // Get recent orders
        const recentOrders = await Order.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']]
        });

        // Calculate total sales
        const totalSales = await Order.sum('totalPrice') || 0;

        res.json({
            totalProducts,
            totalOrders,
            totalCategories,
            totalSales,
            recentOrders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardStats };
