const Product = require('../models/Product');
const Category = require('../models/Category');
const { Op } = require('sequelize');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const page = Number(req.query.pageNumber) || 1;
        const pageSize = 100;
        const keyword = req.query.keyword || '';
        const categoryName = req.query.category || '';

        const where = {
            deletedAt: null,
            [Op.and]: [
                {
                    [Op.or]: [
                        { name: { [Op.like]: `%${keyword}%` } }
                    ]
                }
            ]
        };

        if (categoryName) {
            where[Op.and].push({
                '$Category.name$': { [Op.like]: `%${categoryName}%` }
            });
        }

        const { count, rows: products } = await Product.findAndCountAll({
            where,
            include: [{ model: Category, attributes: ['name'] }],
            limit: pageSize,
            offset: pageSize * (page - 1),
            order: [['createdAt', 'DESC']]
        });

        res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: Category, attributes: ['name'] }]
        });

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const { name, rate, discount, categoryId, inStock } = req.body;

        if (!name || !rate || !categoryId) {
            return res.status(400).json({ 
                success: false,
                message: 'Validation Error: name, rate, and categoryId are required'
            });
        }

        // Validate rate is a number
        if (isNaN(rate)) {
            return res.status(400).json({ 
                success: false,
                message: 'Rate must be a valid number'
            });
        }

        const product = await Product.create({
            name,
            rate: parseFloat(rate),
            discount: parseFloat(discount) || 0,
            categoryId,
            inStock: inStock !== undefined ? inStock : true,
            finalPrice: Math.max(0, parseFloat(rate) - (parseFloat(discount) || 0))
        });

        res.status(201).json({
            success: true,
            message: '✅ Product created successfully',
            product
        });
    } catch (error) {
        console.error('Product creation error:', error);
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const { name, rate, discount, categoryId, inStock } = req.body;
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ 
                success: false,
                message: 'Product not found' 
            });
        }

        product.name = name || product.name;
        product.rate = rate ? parseFloat(rate) : product.rate;
        product.discount = discount !== undefined ? parseFloat(discount) : product.discount;
        product.categoryId = categoryId || product.categoryId;
        product.inStock = inStock !== undefined ? inStock : product.inStock;

        await product.save();
        res.json({
            success: true,
            message: '✅ Product updated successfully',
            product
        });
    } catch (error) {
        console.error('Product update error:', error);
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
    }
};

// @desc    Delete a product (Soft Delete)
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ 
                success: false,
                message: 'Product not found' 
            });
        }

        await product.destroy(); // Since paranoid is true, this will do soft delete
        res.json({ 
            success: true,
            message: '✅ Product deleted successfully' 
        });
    } catch (error) {
        console.error('Product delete error:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
