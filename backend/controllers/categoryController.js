const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: { deletedAt: null },
            order: [['name', 'ASC']]
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
    const { name, isActive } = req.body;

    try {
        if (!name || name.trim() === '') {
            return res.status(400).json({ 
                success: false,
                message: 'Category name is required' 
            });
        }

        const categoryExists = await Category.findOne({ where: { name } });

        if (categoryExists) {
            return res.status(400).json({ 
                success: false,
                message: 'Category already exists' 
            });
        }

        const category = await Category.create({
            name,
            isActive: isActive !== undefined ? isActive : true
        });

        res.status(201).json({
            success: true,
            message: '✅ Category created successfully',
            category
        });
    } catch (error) {
        console.error('Category creation error:', error);
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
    }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
    const { name, isActive } = req.body;

    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ 
                success: false,
                message: 'Category not found' 
            });
        }

        category.name = name || category.name;
        category.isActive = isActive !== undefined ? isActive : category.isActive;

        const updatedCategory = await category.save();
        res.json({
            success: true,
            message: '✅ Category updated successfully',
            category: updatedCategory
        });
    } catch (error) {
        console.error('Category update error:', error);
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
    }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ 
                success: false,
                message: 'Category not found' 
            });
        }

        await category.destroy(); // Soft delete due to paranoid: true
        res.json({ 
            success: true,
            message: '✅ Category deleted successfully' 
        });
    } catch (error) {
        console.error('Category delete error:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
