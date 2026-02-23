const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(createOrder)
    .get(protect, getOrders);

router.route('/:id')
    .get(protect, getOrderById)
    .delete(protect, deleteOrder);

router.route('/:id/status').put(protect, updateOrderStatus);

module.exports = router;
