const bcrypt = require('bcryptjs');

const hashPassword = async () => {
    const password = 'admin123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Password:', password);
    console.log('Hashed:', hashedPassword);

    // Test the hash
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Hash test:', isMatch ? '✅ Valid' : '❌ Invalid');
};

hashPassword();
