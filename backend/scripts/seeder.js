const dotenv = require('dotenv');
const { sequelize, connectDB } = require('../config/db');
const Admin = require('../models/Admin');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { Order, OrderItem } = require('../models/Order');

dotenv.config();

const importData = async () => {
    try {
        await connectDB();
        
        // Disable foreign key checks before sync
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        
        // Drop and recreate all tables
        await sequelize.sync({ force: true });
        
        // Re-enable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        // Admin
        await Admin.create({
            username: 'admin@sm.com',
            email: 'admin@sm.com',
            password: 'sm1314'
        });
        console.log('✅ Admin User Imported!');

        // Categories
        const cat1 = await Category.create({ name: 'General Pharmacy' });
        const cat2 = await Category.create({ name: 'Skin Care' });
        const cat3 = await Category.create({ name: 'Baby Products' });
        const cat4 = await Category.create({ name: 'Health Drinks' });
        console.log('✅ Categories Imported!');

        // Products
        await Product.create({
            name: 'Paracetamol 500mg',
            rate: 20,
            discount: 2,
            categoryId: cat1.id,
            inStock: true
        });

        await Product.create({
            name: 'Vitamin C Serum',
            rate: 450,
            discount: 50,
            categoryId: cat2.id,
            inStock: true
        });

        await Product.create({
            name: 'Baby Soap',
            rate: 55,
            discount: 5,
            categoryId: cat3.id,
            inStock: true
        });

        await Product.create({
            name: 'Horlicks 500g',
            rate: 260,
            discount: 20,
            categoryId: cat4.id,
            inStock: true
        });

        console.log('✅ Products Imported!');

        // Example Order
        const order = await Order.create({
            customerName: 'Demo Customer',
            totalPrice: 18,
            status: 'Order Placed'
        });

        await OrderItem.create({
            orderId: order.id,
            productId: 1,
            productName: 'Paracetamol 500mg',
            quantity: 1,
            price: 18
        });

        console.log('✅ Example Order Imported!');
        console.log('🚀 Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error seeding data: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();
        await sequelize.drop();
        console.log('🗑️ Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error destroying data: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
