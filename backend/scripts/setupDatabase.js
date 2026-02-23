const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const setupDatabase = async () => {
    let connection;

    try {
        console.log('🔧 Starting database setup...\n');

        // Create connection without specifying a database
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            multipleStatements: true
        });

        console.log('✅ Connected to MySQL Server');

        // Read and execute the SQL file
        const sqlFilePath = path.join(__dirname, '../../database/sm_web_database.sql');
        const sqlScript = fs.readFileSync(sqlFilePath, 'utf-8');

        console.log('📄 Reading SQL schema file...');
        console.log('🚀 Executing database schema...\n');

        // Execute the SQL script
        await connection.query(sqlScript);

        console.log('✅ Database created successfully!');
        console.log('✅ Tables created successfully!');
        console.log('✅ Sample data inserted successfully!\n');

        console.log('═══════════════════════════════════════════════════');
        console.log('🎉 DATABASE SETUP COMPLETE!');
        console.log('═══════════════════════════════════════════════════');
        console.log('\n📊 Database Details:');
        console.log(`   Database Name: ${process.env.DB_NAME || 'sm_web'}`);
        console.log(`   Host: ${process.env.DB_HOST || 'localhost'}`);
        console.log(`   Port: 3306`);
        console.log('\n👤 Default Admin Credentials:');
        console.log('   Username: admin');
        console.log('   Password: admin123');
        console.log('\n📋 Tables Created:');
        console.log('   1. Admins');
        console.log('   2. Categories');
        console.log('   3. Products');
        console.log('   4. Customers');
        console.log('   5. Orders');
        console.log('   6. OrderItems');
        console.log('   7. Suppliers');
        console.log('   8. ActivityLogs');
        console.log('\n💡 Next Steps:');
        console.log('   1. Start backend: npm run server');
        console.log('   2. Start frontend: npm run dev');
        console.log('═══════════════════════════════════════════════════\n');

        await connection.end();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error setting up database:', error.message);
        console.log('\n🔍 Troubleshooting:');
        console.log('   1. Make sure MySQL is running');
        console.log('   2. Check your .env file for correct credentials');
        console.log('   3. Ensure the MySQL user has proper permissions\n');

        if (connection) {
            await connection.end();
        }
        process.exit(1);
    }
};

setupDatabase();
