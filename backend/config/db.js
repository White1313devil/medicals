const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'sm_web',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false, // Set to console.log to see SQL queries
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ MySQL Connected (Sequelize)');

        // Sync models with the database
        await sequelize.sync({ alter: true });
        console.log('📦 Database schema synced successfully');
    } catch (error) {
        console.error(`❌ MySQL Connection Error: ${error.message}`);
        console.log('--------------------------------------------------');
        console.log('TIP: Connection failed. Please check:');
        console.log('1. Your MySQL credentials in .env file');
        console.log('2. Ensure MySQL server is running locally');
        console.log('3. Ensure the database specified in .env exists');
        console.log('--------------------------------------------------');
    }
};

module.exports = { sequelize, connectDB };
