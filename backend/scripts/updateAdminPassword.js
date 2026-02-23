const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');
const Admin = require('../models/Admin');
require('dotenv').config();

const updateAdminPassword = async () => {
    try {
        console.log('🔧 Updating admin passwords...\n');

        // Connect to database
        await sequelize.authenticate();
        console.log('✅ Connected to database');

        // Generate new password hash
        const password = 'admin123';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('🔐 Generated new password hash\n');

        // Update admin user - but we need to bypass the hook
        await sequelize.query(
            `UPDATE Admins SET password = ? WHERE username = 'admin'`,
            { replacements: [hashedPassword] }
        );

        await sequelize.query(
            `UPDATE Admins SET password = ? WHERE username = 'manager'`,
            { replacements: [hashedPassword] }
        );

        console.log('✅ Admin passwords updated successfully!\n');

        // Verify the update
        const admin = await Admin.findOne({ where: { username: 'admin' } });
        const isValid = await admin.matchPassword(password);

        console.log('═══════════════════════════════════════════════════');
        console.log('🔑 LOGIN CREDENTIALS');
        console.log('═══════════════════════════════════════════════════');
        console.log('Username: admin');
        console.log('Password: admin123');
        console.log(`Password verification: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
        console.log('═══════════════════════════════════════════════════\n');

        await sequelize.close();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

updateAdminPassword();
