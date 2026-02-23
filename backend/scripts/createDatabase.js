const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function createDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '1234',
    });

    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'sm_web'}\`;`);
        console.log(`✅ Database "${process.env.DB_NAME || 'sm_web'}" created or already exists.`);
    } catch (err) {
        console.error(`❌ Error creating database: ${err.message}`);
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('\nTIP: It looks like your MySQL password is wrong or missing.');
            console.log('Please update the DB_PASSWORD in your .env file.');
        }
    } finally {
        await connection.end();
    }
}

createDatabase();
