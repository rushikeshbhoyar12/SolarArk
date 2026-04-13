import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/solarark')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ MongoDB Connection Error:', err));

// ===== USER SCHEMA =====
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

// ===== CAREER APPLICATION SCHEMA =====
const careerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    jobPosition: { type: String, default: 'Not Specified' },
    experience: { type: String, default: 'Not Specified' },
    resume: { type: String, default: null },
    message: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'reviewed', 'rejected'], default: 'pending' },
    submittedAt: { type: Date, default: Date.now }
});

const Career = mongoose.model('Career', careerSchema);

// ===== ROUTES =====

// 1. SIGNUP ROUTE
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({ name, email, password });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_secret_key', {
            expiresIn: '7d'
        });

        res.status(201).json({
            message: 'Signup successful!',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
});

// 2. LOGIN ROUTE
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_secret_key', {
            expiresIn: '7d'
        });

        res.status(200).json({
            message: 'Login successful!',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// 3. CAREER APPLICATION ROUTE
app.post('/api/careers', async (req, res) => {
    try {
        const { name, email, jobPosition, experience, message } = req.body;

        // Validation
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        // Create career application
        const application = new Career({
            name,
            email,
            jobPosition,
            experience,
            message
        });

        await application.save();

        res.status(201).json({
            message: 'Career application submitted successfully! We will review and get back to you soon.'
        });
    } catch (error) {
        console.error('Career Application Error:', error);
        res.status(500).json({ message: 'Error submitting career application' });
    }
});

// 4. GET ALL CAREER APPLICATIONS (Protected - for admin)
app.get('/api/careers', async (req, res) => {
    try {
        const applications = await Career.find().sort({ submittedAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        console.error('Fetch Careers Error:', error);
        res.status(500).json({ message: 'Error fetching career applications' });
    }
});

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Auth Server is running' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Auth Server running on http://localhost:${PORT}`);
});
