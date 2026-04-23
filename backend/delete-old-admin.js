import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.admin' });

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/solarark');

// Define AdminUser Schema
const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    createdAt: Date
});

const AdminUser = mongoose.model('AdminUser', adminSchema);

try {
    // Delete all admin users
    const result = await AdminUser.deleteMany({});

    console.log('✅ Deleted', result.deletedCount, 'old admin user(s)');
    console.log('\n📝 MongoDB is now clean. Create a new admin user using Option 2 in SETUP_GUIDE.md\n');

    process.exit(0);
} catch (error) {
    console.error('❌ Error deleting admin users:', error.message);
    process.exit(1);
}
