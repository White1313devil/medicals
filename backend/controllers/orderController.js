const { Order, OrderItem } = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
    try {
        const { customerName, products, totalPrice } = req.body;

        if (!customerName) {
            return res.status(400).json({ 
                success: false,
                message: 'Customer name is required' 
            });
        }

        if (!products || products.length === 0) {
            return res.status(400).json({ 
                success: false,
                message: 'Order must contain at least one item' 
            });
        }

        const orderItems = products.map(item => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity || 1,
            price: item.price
        }));

        const order = await Order.create({
            customerName,
            totalPrice,
            status: 'Order Placed',
            items: orderItems
        }, {
            include: [{ model: OrderItem, as: 'items' }]
        });

        res.status(201).json({
            success: true,
            message: '✅ Order placed successfully',
            order
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [{ model: OrderItem, as: 'items' }],
            order: [['createdAt', 'DESC']]
        });
        res.json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private/Admin
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [{ model: OrderItem, as: 'items' }]
        });

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByPk(req.params.id);

        if (order) {
            order.status = status || order.status;
            await order.save();
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);

        if (order) {
            await order.destroy(); // This will cascade delete OrderItems
            res.json({ message: 'Order deleted successfully' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
};
