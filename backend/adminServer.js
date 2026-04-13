import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

dotenv.config({ path: '.env.admin' });

const app = express();
const PORT = process.env.ADMIN_PORT || 5900;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/solarark')
    .then(() => console.log('✅ Admin Server: MongoDB Connected'))
    .catch(err => console.log('❌ Admin Server: MongoDB Connection Error:', err));

// ===== EMAIL CONFIGURATION =====
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAIL || 'your-email@gmail.com',
        pass: process.env.SMTP_PASSWORD || 'your-app-password'
    }
});

const sendEmail = async (to, subject, htmlContent) => {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_EMAIL || 'noreply@solarark.com',
            to,
            subject,
            html: htmlContent
        });
        console.log(`✅ Email sent to ${to}`);
        return true;
    } catch (error) {
        console.error('❌ Email send error:', error);
        return false;
    }
};

// ===== ADMIN USER SCHEMA =====
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'manager', 'viewer'], default: 'manager' },
    createdAt: { type: Date, default: Date.now }
});

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const AdminUser = mongoose.model('AdminUser', adminSchema);

// ===== BOOKING SCHEMA (FROM FORM SERVER) =====
const bookingSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phoneNumber: { type: String, required: true },
    pinCode: { type: String, required: true },
    city: { type: String, required: true },
    electricBill: { type: String, required: true },
    status: { type: String, enum: ['pending', 'contacted', 'completed'], default: 'pending' },
    notes: { type: String, default: '' },
    contactedAt: { type: Date, default: null },
    assignedTo: { type: String, default: null },
    submittedAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

// ===== CONTACT SCHEMA (FROM FORM SERVER) =====
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    companyName: { type: String, required: true },
    whatsAppNumber: { type: String, required: true },
    city: { type: String, required: true },
    companyPinCode: { type: String, required: true },
    averageElectricBill: { type: String, required: true },
    status: { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },
    reply: { type: String, default: '' },
    repliedAt: { type: Date, default: null },
    submittedAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// ===== CAREER SCHEMA (FROM AUTH SERVER) =====
const careerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    jobPosition: { type: String, default: 'Not Specified' },
    experience: { type: String, default: 'Not Specified' },
    resume: { type: String, default: null },
    message: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
    feedback: { type: String, default: '' },
    submittedAt: { type: Date, default: Date.now }
});

const Career = mongoose.model('Career', careerSchema);

// ===== JOB POSTING SCHEMA (FOR CAREERS PAGE) =====
const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: String, default: '0-2' },
    salary: { type: String, default: 'Competitive' },
    jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract'], default: 'Full-time' },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

// ===== MIDDLEWARE: JWT VERIFICATION =====
const verifyAdminToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
        req.adminId = decoded.adminId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// ===== ADMIN AUTH ROUTES =====

// 1. ADMIN SIGNUP (Only for superadmin)
app.post('/api/admin/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingAdmin = await AdminUser.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const admin = new AdminUser({ name, email, password, role: role || 'manager' });
        await admin.save();

        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET || 'your_secret_key', {
            expiresIn: '7d'
        });

        res.status(201).json({
            message: 'Admin signup successful!',
            token,
            admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
        });
    } catch (error) {
        console.error('Admin Signup Error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
});

// 2. ADMIN LOGIN
app.post('/api/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const admin = await AdminUser.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordMatch = await admin.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET || 'your_secret_key', {
            expiresIn: '7d'
        });

        res.status(200).json({
            message: 'Admin login successful!',
            token,
            admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
        });
    } catch (error) {
        console.error('Admin Login Error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// ===== BOOKINGS MANAGEMENT =====

// GET ALL BOOKINGS WITH FILTERS
app.get('/api/admin/bookings', verifyAdminToken, async (req, res) => {
    try {
        const { status, city, sort } = req.query;
        let filter = {};

        if (status) filter.status = status;
        if (city) filter.city = city;

        const bookings = await Booking.find(filter).sort({ submittedAt: sort === 'old' ? 1 : -1 });
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Get Bookings Error:', error);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
});

// GET SINGLE BOOKING
app.get('/api/admin/bookings/:id', verifyAdminToken, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking' });
    }
});

// UPDATE BOOKING STATUS
app.put('/api/admin/bookings/:id', verifyAdminToken, async (req, res) => {
    try {
        const { status, notes } = req.body;

        // Get current booking to validate status transition
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Define valid status transitions
        const validTransitions = {
            'pending': ['contacted', 'completed'],      // pending can go to contacted or completed
            'contacted': ['completed'],                 // contacted can only go to completed
            'completed': ['completed']                  // completed can only stay completed
        };

        const currentStatus = booking.status;
        const allowedStatuses = validTransitions[currentStatus] || [];

        // Check if the transition is allowed
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: `Cannot change status from '${currentStatus}' to '${status}'. Valid transitions: ${allowedStatuses.join(', ') || 'none'}`
            });
        }

        const updateData = { status, notes };

        if (status === 'contacted') {
            updateData.contactedAt = new Date();
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
    } catch (error) {
        console.error('Update Booking Error:', error);
        res.status(500).json({ message: 'Error updating booking' });
    }
});

// DELETE BOOKING
app.delete('/api/admin/bookings/:id', verifyAdminToken, async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking' });
    }
});

// ===== CONTACTS MANAGEMENT =====

// GET ALL CONTACTS WITH FILTERS
app.get('/api/admin/contacts', verifyAdminToken, async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};

        if (status) filter.status = status;

        const contacts = await Contact.find(filter).sort({ submittedAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Get Contacts Error:', error);
        res.status(500).json({ message: 'Error fetching contacts' });
    }
});

// GET SINGLE CONTACT
app.get('/api/admin/contacts/:id', verifyAdminToken, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contact' });
    }
});

// UPDATE CONTACT (Add reply)
app.put('/api/admin/contacts/:id', verifyAdminToken, async (req, res) => {
    try {
        const { reply, status } = req.body;
        const updateData = { status: status || 'replied', reply, repliedAt: new Date() };

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Send reply email to contact if reply is provided
        if (reply) {
            const replyEmailHTML = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background-color: #dc2626; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                        <h2 style="margin: 0;">Response from SolarARK</h2>
                    </div>
                    <div style="background-color: #f8f8f8; padding: 20px; border-radius: 0 0 8px 8px;">
                        <p>Hello <strong>${contact.name}</strong>,</p>
                        <p>Thank you for reaching out to SolarARK. Here's our response to your inquiry:</p>
                        <div style="background-color: white; padding: 15px; border-left: 4px solid #dc2626; margin: 20px 0; border-radius: 4px;">
                            <p style="margin: 0; color: #333;">${reply}</p>
                        </div>
                        <p>If you have any further questions, please feel free to reply to this email.</p>
                        <p>Best regards,<br><strong>SolarARK Team</strong></p>
                        <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
                        <p style="font-size: 12px; color: #666; margin-top: 20px;">
                            <strong>Original Inquiry:</strong><br>
                            Company: ${contact.companyName}<br>
                            WhatsApp: ${contact.whatsAppNumber}<br>
                            City: ${contact.city}
                        </p>
                    </div>
                </div>
            `;

            await sendEmail(contact.email, 'Response to Your SolarARK Inquiry', replyEmailHTML);
        }

        res.status(200).json({ message: 'Contact updated successfully and email sent', contact });
    } catch (error) {
        console.error('Update Contact Error:', error);
        res.status(500).json({ message: 'Error updating contact' });
    }
});

// DELETE CONTACT
app.delete('/api/admin/contacts/:id', verifyAdminToken, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contact' });
    }
});

// ===== CAREERS MANAGEMENT =====

// GET ALL CAREERS WITH FILTERS
app.get('/api/admin/careers', verifyAdminToken, async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};

        if (status) filter.status = status;

        const careers = await Career.find(filter).sort({ submittedAt: -1 });
        res.status(200).json(careers);
    } catch (error) {
        console.error('Get Careers Error:', error);
        res.status(500).json({ message: 'Error fetching careers' });
    }
});

// GET SINGLE CAREER
app.get('/api/admin/careers/:id', verifyAdminToken, async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }
        res.status(200).json(career);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching career' });
    }
});

// UPDATE CAREER STATUS
app.put('/api/admin/careers/:id', verifyAdminToken, async (req, res) => {
    try {
        const { status, feedback } = req.body;
        const updateData = { status, feedback };

        const career = await Career.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }

        res.status(200).json({ message: 'Career updated successfully', career });
    } catch (error) {
        console.error('Update Career Error:', error);
        res.status(500).json({ message: 'Error updating career' });
    }
});

// DELETE CAREER
app.delete('/api/admin/careers/:id', verifyAdminToken, async (req, res) => {
    try {
        const career = await Career.findByIdAndDelete(req.params.id);
        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }
        res.status(200).json({ message: 'Career deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting career' });
    }
});

// ===== JOB POSTINGS MANAGEMENT (FOR CAREERS PAGE) =====

// CREATE NEW JOB POSTING
app.post('/api/admin/jobs', verifyAdminToken, async (req, res) => {
    try {
        const { title, description, requirements, location, experience, salary, jobType } = req.body;

        if (!title || !description || !requirements || !location) {
            return res.status(400).json({ message: 'Title, description, requirements, and location are required' });
        }

        const job = new Job({
            title,
            description,
            requirements,
            location,
            experience: experience || '0-2',
            salary: salary || 'Competitive',
            jobType: jobType || 'Full-time',
            isActive: true
        });

        await job.save();
        res.status(201).json({ message: 'Job posting created successfully!', job });
    } catch (error) {
        console.error('Create Job Error:', error);
        res.status(500).json({ message: 'Error creating job posting' });
    }
});

// GET ALL JOB POSTINGS (with filter for active/inactive)
app.get('/api/admin/jobs', verifyAdminToken, async (req, res) => {
    try {
        const { isActive } = req.query;
        let filter = {};
        if (isActive !== undefined) filter.isActive = isActive === 'true';

        const jobs = await Job.find(filter).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Get Jobs Error:', error);
        res.status(500).json({ message: 'Error fetching job postings' });
    }
});

// GET SINGLE JOB POSTING
app.get('/api/admin/jobs/:id', verifyAdminToken, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job posting not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job posting' });
    }
});

// UPDATE JOB POSTING
app.put('/api/admin/jobs/:id', verifyAdminToken, async (req, res) => {
    try {
        const { title, description, requirements, location, experience, salary, jobType, isActive } = req.body;

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (requirements) updateData.requirements = requirements;
        if (location) updateData.location = location;
        if (experience) updateData.experience = experience;
        if (salary) updateData.salary = salary;
        if (jobType) updateData.jobType = jobType;
        if (isActive !== undefined) updateData.isActive = isActive;
        updateData.updatedAt = new Date();

        const job = await Job.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!job) {
            return res.status(404).json({ message: 'Job posting not found' });
        }

        res.status(200).json({ message: 'Job posting updated successfully', job });
    } catch (error) {
        console.error('Update Job Error:', error);
        res.status(500).json({ message: 'Error updating job posting' });
    }
});

// DELETE JOB POSTING
app.delete('/api/admin/jobs/:id', verifyAdminToken, async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job posting not found' });
        }
        res.status(200).json({ message: 'Job posting deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job posting' });
    }
});

// PUBLIC ENDPOINT: GET ALL ACTIVE JOB POSTINGS (for main website careers page)
app.get('/api/jobs/active', async (req, res) => {
    try {
        const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Get Active Jobs Error:', error);
        res.status(500).json({ message: 'Error fetching jobs' });
    }
});

// ===== DASHBOARD ANALYTICS =====

// GET DASHBOARD SUMMARY
app.get('/api/admin/dashboard', verifyAdminToken, async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const pendingBookings = await Booking.countDocuments({ status: 'pending' });
        const totalContacts = await Contact.countDocuments();
        const unreadContacts = await Contact.countDocuments({ status: 'unread' });
        const totalCareers = await Career.countDocuments();
        const pendingCareers = await Career.countDocuments({ status: 'pending' });

        const recentBookings = await Booking.find().sort({ submittedAt: -1 }).limit(5);
        const recentContacts = await Contact.find().sort({ submittedAt: -1 }).limit(5);

        res.status(200).json({
            summary: {
                totalBookings,
                pendingBookings,
                totalContacts,
                unreadContacts,
                totalCareers,
                pendingCareers
            },
            recent: {
                bookings: recentBookings,
                contacts: recentContacts
            }
        });
    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
});

// Health check
app.get('/api/admin/health', (req, res) => {
    res.status(200).json({ message: '✅ Admin Server is running on port ' + PORT });
});

// ===== MIGRATION ENDPOINT =====
// Add status to all existing bookings, contacts, and careers that don't have one
app.post('/api/admin/migrate', async (req, res) => {
    try {
        // Update bookings without status
        const updatedBookings = await Booking.updateMany(
            { status: { $exists: false } },
            { $set: { status: 'pending' } }
        );

        // Update contacts without status
        const updatedContacts = await Contact.updateMany(
            { status: { $exists: false } },
            { $set: { status: 'unread' } }
        );

        // Update careers without status
        const updatedCareers = await Career.updateMany(
            { status: { $exists: false } },
            { $set: { status: 'pending' } }
        );

        res.status(200).json({
            message: 'Migration completed successfully',
            results: {
                bookingsUpdated: updatedBookings.modifiedCount,
                contactsUpdated: updatedContacts.modifiedCount,
                careersUpdated: updatedCareers.modifiedCount
            }
        });
    } catch (error) {
        console.error('Migration Error:', error);
        res.status(500).json({ message: 'Migration failed' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Admin Server listening on http://localhost:${PORT}`);
});
