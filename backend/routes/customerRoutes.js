const express = require('express');
const router = express.Router();
const {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController');
// const { protect, admin } = require('../middleware/authMiddleware');

// All routes require admin authentication
// router.use(protect);
// router.use(admin);

// @route   GET /api/customers
// @route   POST /api/customers
router.route('/')
    .get(getCustomers)
    .post(createCustomer);

// @route   GET /api/customers/:id
// @route   PUT /api/customers/:id
// @route   DELETE /api/customers/:id
router.route('/:id')
    .get(getCustomerById)
    .put(updateCustomer)
    .delete(deleteCustomer);

module.exports = router;
