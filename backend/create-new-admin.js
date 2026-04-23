import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.admin' });

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/solarark');

// Define AdminUser Schema
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin'], default: 'admin' },
    createdAt: { type: Date, default: Date.now }
});

const AdminUser = mongoose.model('AdminUser', adminSchema);

// New admin credentials - CHANGE THESE!
const newAdmin = {
    name: 'Admin User',
    email: 'admin@solarark.com',
    password: 'admin123' // ⚠️ CHANGE THIS!
};

try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newAdmin.password, salt);

    // Create admin user
    const admin = await AdminUser.create({
        name: newAdmin.name,
        email: newAdmin.email,
        password: hashedPassword,
        role: 'admin'
    });

    console.log('✅ New admin user created successfully!');
    console.log('\n📧 Email:', admin.email);
    console.log('🔑 Password:', newAdmin.password);
    console.log('\n⚠️  Save these credentials securely!\n');

    process.exit(0);
} catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
}
