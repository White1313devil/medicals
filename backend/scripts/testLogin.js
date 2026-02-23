const http = require('http');

const testLogin = () => {
    const data = JSON.stringify({
        username: 'admin',
        password: 'admin123'
    });

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    console.log('🧪 Testing Admin Login...\n');
    console.log('Credentials:');
    console.log('  Username: admin');
    console.log('  Password: admin123\n');

    const req = http.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            console.log('Response Status:', res.statusCode);
            console.log('\nResponse Body:');
            try {
                const parsed = JSON.parse(responseData);
                console.log(JSON.stringify(parsed, null, 2));

                if (res.statusCode === 200) {
                    console.log('\n✅ LOGIN SUCCESSFUL!');
                    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                    console.log('You can now use this token for authenticated requests');
                    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
                } else {
                    console.log('\n❌ LOGIN FAILED');
                }
            } catch (e) {
                console.log(responseData);
            }
        });
    });

    req.on('error', (error) => {
        console.error('❌ Error:', error.message);
    });

    req.write(data);
    req.end();
};

testLogin();
