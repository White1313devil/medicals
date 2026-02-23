const express = require('express');
const router = express.Router();
const {
    getSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
} = require('../controllers/supplierController');
// const { protect, admin } = require('../middleware/authMiddleware');

// All routes require admin authentication
// router.use(protect);
// router.use(admin);

// @route   GET /api/suppliers
// @route   POST /api/suppliers
router.route('/')
    .get(getSuppliers)
    .post(createSupplier);

// @route   GET /api/suppliers/:id
// @route   PUT /api/suppliers/:id
// @route   DELETE /api/suppliers/:id
router.route('/:id')
    .get(getSupplierById)
    .put(updateSupplier)
    .delete(deleteSupplier);

module.exports = router;
