const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

const authController = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: '❌ Please provide username/email and password'
        });
    }

    try {
        // Find admin by username OR email (handle both cases)
        const admin = await Admin.findOne({
            where: {
                [require('sequelize').Op.or]: [
                    { username: username },
                    { email: username }
                ]
            }
        });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: '❌ Invalid username/email or password'
            });
        }

        // Check password
        const isPasswordMatch = await admin.matchPassword(password);
        
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: '❌ Invalid username/email or password'
            });
        }

        // Update last login
        admin.lastLogin = new Date();
        await admin.save();

        // Generate and send token
        const token = generateToken(admin.id);
        
        res.json({
            success: true,
            id: admin.id,
            username: admin.username,
            email: admin.email,
            role: admin.role,
            token: token
        });
    } catch (error) {
        console.error('🔴 Login error:', error);
        res.status(500).json({
            success: false,
            message: '❌ Server error during login. Please try again.'
        });
    }
};

module.exports = { authController };
