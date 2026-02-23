const Supplier = require('../models/Supplier');
const { Op } = require('sequelize');

// @desc    Get all suppliers
// @route   GET /api/suppliers
// @access  Private/Admin
const getSuppliers = async (req, res) => {
    try {
        const page = Number(req.query.pageNumber) || 1;
        const pageSize = 50;
        const keyword = req.query.keyword || '';

        const where = {
            deletedAt: null,
            [Op.or]: [
                { name: { [Op.like]: `%${keyword}%` } },
                { contactPerson: { [Op.like]: `%${keyword}%` } },
                { email: { [Op.like]: `%${keyword}%` } },
                { phone: { [Op.like]: `%${keyword}%` } }
            ]
        };

        const { count, rows: suppliers } = await Supplier.findAndCountAll({
            where,
            limit: pageSize,
            offset: pageSize * (page - 1),
            order: [['createdAt', 'DESC']]
        });

        res.json({ suppliers, page, pages: Math.ceil(count / pageSize), total: count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single supplier
// @route   GET /api/suppliers/:id
// @access  Private/Admin
const getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);

        if (supplier) {
            res.json(supplier);
        } else {
            res.status(404).json({ message: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a supplier
// @route   POST /api/suppliers
// @access  Private/Admin
const createSupplier = async (req, res) => {
    try {
        const { name, contactPerson, email, phone, address, city, state, gstNumber } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Supplier name is required' });
        }

        // Check if supplier with same email already exists
        if (email) {
            const supplierExists = await Supplier.findOne({ where: { email } });
            if (supplierExists) {
                return res.status(400).json({ message: 'Supplier with this email already exists' });
            }
        }

        const supplier = await Supplier.create({
            name,
            contactPerson,
            email,
            phone,
            address,
            city,
            state,
            gstNumber
        });

        res.status(201).json(supplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a supplier
// @route   PUT /api/suppliers/:id
// @access  Private/Admin
const updateSupplier = async (req, res) => {
    try {
        const { name, contactPerson, email, phone, address, city, state, gstNumber, isActive } = req.body;
        const supplier = await Supplier.findByPk(req.params.id);

        if (supplier) {
            supplier.name = name || supplier.name;
            supplier.contactPerson = contactPerson !== undefined ? contactPerson : supplier.contactPerson;
            supplier.email = email !== undefined ? email : supplier.email;
            supplier.phone = phone !== undefined ? phone : supplier.phone;
            supplier.address = address !== undefined ? address : supplier.address;
            supplier.city = city !== undefined ? city : supplier.city;
            supplier.state = state !== undefined ? state : supplier.state;
            supplier.gstNumber = gstNumber !== undefined ? gstNumber : supplier.gstNumber;
            supplier.isActive = isActive !== undefined ? isActive : supplier.isActive;

            await supplier.save();
            res.json(supplier);
        } else {
            res.status(404).json({ message: 'Supplier not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a supplier (Soft Delete)
// @route   DELETE /api/suppliers/:id
// @access  Private/Admin
const deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);

        if (supplier) {
            await supplier.destroy(); // Soft delete due to paranoid: true
            res.json({ message: 'Supplier removed' });
        } else {
            res.status(404).json({ message: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
};
