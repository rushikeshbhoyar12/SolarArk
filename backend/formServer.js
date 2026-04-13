import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5800;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/solarark')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ MongoDB Connection Error:', err));

// ===== EMAIL CONFIGURATION =====
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAIL || 'your-email@gmail.com',
        pass: process.env.SMTP_PASSWORD || 'your-app-password'
    }
});

// Function to send email
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

// ===== BOOKING FORM SCHEMA =====
const bookingSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phoneNumber: { type: String, required: true },
    pinCode: { type: String, required: true },
    city: { type: String, required: true },
    electricBill: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

// ===== CONTACT FORM SCHEMA =====
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    companyName: { type: String, required: true },
    whatsAppNumber: { type: String, required: true },
    city: { type: String, required: true },
    companyPinCode: { type: String, required: true },
    averageElectricBill: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// ===== STATES DATA =====
const statesData = [
    { _id: 1, name: "Andhra Pradesh" },
    { _id: 2, name: "Arunachal Pradesh" },
    { _id: 3, name: "Assam" },
    { _id: 4, name: "Bihar" },
    { _id: 5, name: "Chhattisgarh" },
    { _id: 6, name: "Goa" },
    { _id: 7, name: "Gujarat" },
    { _id: 8, name: "Haryana" },
    { _id: 9, name: "Himachal Pradesh" },
    { _id: 10, name: "Jharkhand" },
    { _id: 11, name: "Karnataka" },
    { _id: 12, name: "Kerala" },
    { _id: 13, name: "Madhya Pradesh" },
    { _id: 14, name: "Maharashtra" },
    { _id: 15, name: "Manipur" },
    { _id: 16, name: "Meghalaya" },
    { _id: 17, name: "Mizoram" },
    { _id: 18, name: "Nagaland" },
    { _id: 19, name: "Odisha" },
    { _id: 20, name: "Punjab" },
    { _id: 21, name: "Rajasthan" },
    { _id: 22, name: "Sikkim" },
    { _id: 23, name: "Tamil Nadu" },
    { _id: 24, name: "Telangana" },
    { _id: 25, name: "Tripura" },
    { _id: 26, name: "Uttar Pradesh" },
    { _id: 27, name: "Uttarakhand" },
    { _id: 28, name: "West Bengal" }
];

// ===== ROUTES =====

// 1. GET STATES
app.get('/api/states', (req, res) => {
    try {
        res.status(200).json(statesData);
    } catch (error) {
        console.error('Fetch States Error:', error);
        res.status(500).json({ message: 'Error fetching states' });
    }
});

// 2. BOOKING FORM SUBMISSION
app.post('/api/send-email', async (req, res) => {
    try {
        const { fullName, email, phoneNumber, pinCode, city, electricBill } = req.body;

        // Validation
        if (!fullName || !email || !phoneNumber || !pinCode || !city || !electricBill) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Save to database
        const booking = new Booking({
            fullName,
            email,
            phoneNumber,
            pinCode,
            city,
            electricBill
        });

        await booking.save();

        // Send confirmation email to user
        const userEmailHTML = `
      <h2>Thank you for your Solar Booking Inquiry!</h2>
      <p>Hello ${fullName},</p>
      <p>We have received your booking inquiry. Our team will review your details and get back to you shortly.</p>
      <h3>Your Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${fullName}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phoneNumber}</li>
        <li><strong>City:</strong> ${city}</li>
        <li><strong>Pin Code:</strong> ${pinCode}</li>
        <li><strong>Monthly Electric Bill:</strong> ₹${electricBill}</li>
      </ul>
      <p>We appreciate your interest in SolarARK!</p>
      <p>Best regards,<br>SolarARK Team</p>
    `;

        await sendEmail(email, 'Solar Booking Confirmation - SolarARK', userEmailHTML);

        // Send notification to admin
        const adminEmailHTML = `
      <h2>New Booking Inquiry Received</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phoneNumber}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Pin Code:</strong> ${pinCode}</p>
      <p><strong>Monthly Electric Bill:</strong> ₹${electricBill}</p>
      <p>Submitted At: ${new Date().toLocaleString()}</p>
    `;

        await sendEmail(process.env.ADMIN_EMAIL || 'admin@solarark.com', 'New Booking Inquiry', adminEmailHTML);

        res.status(201).json({
            message: 'Booking inquiry submitted successfully! Check your email for confirmation.'
        });
    } catch (error) {
        console.error('Booking Form Error:', error);
        res.status(500).json({ message: 'Error submitting booking form' });
    }
});

// 3. CONTACT FORM SUBMISSION
app.post('/api/contactform', async (req, res) => {
    try {
        const { name, email, companyName, whatsAppNumber, city, companyPinCode, averageElectricBill } = req.body;

        // Validation
        if (!name || !email || !companyName || !whatsAppNumber || !city || !companyPinCode || !averageElectricBill) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate email format
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Valid email is required' });
        }

        // Save to database
        const contact = new Contact({
            name,
            email,
            companyName,
            whatsAppNumber,
            city,
            companyPinCode,
            averageElectricBill
        });

        await contact.save();

        // Send confirmation email to user
        const userEmailHTML = `
      <h2>Thank you for your Contact Inquiry!</h2>
      <p>Hello ${name},</p>
      <p>We have received your contact inquiry. Our team will review your details and get back to you shortly.</p>
      <h3>Your Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Company:</strong> ${companyName}</li>
        <li><strong>WhatsApp:</strong> ${whatsAppNumber}</li>
        <li><strong>City:</strong> ${city}</li>
        <li><strong>Pin Code:</strong> ${companyPinCode}</li>
        <li><strong>Avg. Electric Bill:</strong> ₹${averageElectricBill}</li>
      </ul>
      <p>We appreciate your interest in SolarARK!</p>
      <p>Best regards,<br>SolarARK Team</p>
    `;

        await sendEmail(email, 'Contact Form Confirmation - SolarARK', userEmailHTML);

        // Send notification to admin
        const adminEmailHTML = `
      <h2>New Contact Inquiry Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${companyName}</p>
      <p><strong>WhatsApp:</strong> ${whatsAppNumber}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Pin Code:</strong> ${companyPinCode}</p>
      <p><strong>Avg. Electric Bill:</strong> ₹${averageElectricBill}</p>
      <p>Submitted At: ${new Date().toLocaleString()}</p>
    `;

        await sendEmail(process.env.ADMIN_EMAIL || 'admin@solarark.com', 'New Contact Inquiry', adminEmailHTML);

        res.status(201).json({
            message: 'Contact form submitted successfully! Check your email for confirmation.'
        });
    } catch (error) {
        console.error('Contact Form Error:', error);
        res.status(500).json({ message: 'Error submitting contact form' });
    }
});

// 4. GET ALL BOOKINGS (Protected - for admin)
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ submittedAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Fetch Bookings Error:', error);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
});

// 5. GET ALL CONTACTS (Protected - for admin)
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ submittedAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Fetch Contacts Error:', error);
        res.status(500).json({ message: 'Error fetching contacts' });
    }
});

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Forms Server is running' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Forms Server running on http://localhost:${PORT}`);
});
