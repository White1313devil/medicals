const Customer = require('../models/Customer');
const { Op } = require('sequelize');

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private/Admin
const getCustomers = async (req, res) => {
    try {
        const page = Number(req.query.pageNumber) || 1;
        const pageSize = 50;
        const keyword = req.query.keyword || '';

        const where = {
            deletedAt: null,
            [Op.or]: [
                { name: { [Op.like]: `%${keyword}%` } },
                { email: { [Op.like]: `%${keyword}%` } },
                { phone: { [Op.like]: `%${keyword}%` } }
            ]
        };

        const { count, rows: customers } = await Customer.findAndCountAll({
            where,
            limit: pageSize,
            offset: pageSize * (page - 1),
            order: [['createdAt', 'DESC']]
        });

        res.json({ customers, page, pages: Math.ceil(count / pageSize), total: count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single customer
// @route   GET /api/customers/:id
// @access  Private/Admin
const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);

        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a customer
// @route   POST /api/customers
// @access  Private/Admin
const createCustomer = async (req, res) => {
    try {
        const { name, email, phone, address, city, state, pincode, gstNumber } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Customer name is required' });
        }

        // Check if customer with same email already exists
        if (email) {
            const customerExists = await Customer.findOne({ where: { email } });
            if (customerExists) {
                return res.status(400).json({ message: 'Customer with this email already exists' });
            }
        }

        const customer = await Customer.create({
            name,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            gstNumber
        });

        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Private/Admin
const updateCustomer = async (req, res) => {
    try {
        const { name, email, phone, address, city, state, pincode, gstNumber, isActive } = req.body;
        const customer = await Customer.findByPk(req.params.id);

        if (customer) {
            customer.name = name || customer.name;
            customer.email = email !== undefined ? email : customer.email;
            customer.phone = phone !== undefined ? phone : customer.phone;
            customer.address = address !== undefined ? address : customer.address;
            customer.city = city !== undefined ? city : customer.city;
            customer.state = state !== undefined ? state : customer.state;
            customer.pincode = pincode !== undefined ? pincode : customer.pincode;
            customer.gstNumber = gstNumber !== undefined ? gstNumber : customer.gstNumber;
            customer.isActive = isActive !== undefined ? isActive : customer.isActive;

            await customer.save();
            res.json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a customer (Soft Delete)
// @route   DELETE /api/customers/:id
// @access  Private/Admin
const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);

        if (customer) {
            await customer.destroy(); // Soft delete due to paranoid: true
            res.json({ message: 'Customer removed' });
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};
