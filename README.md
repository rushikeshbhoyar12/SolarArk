# ☀️ SolarARK - Solar Energy Solutions Platform

A full-stack web application for a solar energy company offering installation, consultation, and maintenance services.

**Live Demo:** [Coming Soon]  
**GitHub:** [Your GitHub Link]

---

## 📋 Project Overview

SolarARK is divided into two main components:

### **Frontend** (React + Vite + TailwindCSS)
- Modern, responsive user interface
- Hero sections and service showcases
- Career applications page
- Booking and contact forms
- Real-time animations and counters

### **Backend** (Express.js + MongoDB)
- RESTful API with authentication
- User registration and login (JWT)
- Form submissions (booking, contact, careers)
- Email notifications
- Admin dashboard support

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16+)
- **npm** or **yarn**
- **MongoDB** (Local or Atlas)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/rushikeshbhoyar12/SolarARK.git
cd SolarARK
```

#### 2. Frontend Setup
```bash
cd SolarArk
npm install
npm run dev
```
Frontend runs on: **http://localhost:5173**

#### 3. Backend Setup (New Terminal)
```bash
cd backend
npm install
```

**Create `.env` file in backend folder:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/solarark
JWT_SECRET=your_jwt_secret_key_here
GMAIL_USER=your_email@gmail.com
GMAIL_PASSWORD=your_app_password
NODE_ENV=development
```

**Start servers:**

**Windows:**
```bash
run-servers.bat
```

**Mac/Linux:**
```bash
# Terminal 1
node authServer.js

# Terminal 2
node formServer.js
```

Backend runs on: **http://localhost:5000** (Auth) & **http://localhost:5800** (Forms)

---

## 📁 Project Structure

```
SolarARK/
├── SolarArk/                          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/                # React components
│   │   │   └── Navbar.js
│   │   ├── pages/                     # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/                        # Static assets
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
│
├── backend/                           # Backend (Express + MongoDB)
│   ├── server.js                      # Main server (Admin)
│   ├── authServer.js                  # Auth API (Port 5000)
│   ├── formServer.js                  # Forms API (Port 5800)
│   ├── adminServer.js                 # Admin Dashboard
│   ├── migrate.js                     # Database migrations
│   ├── package.json
│   ├── .env.admin
│   ├── .env.auth
│   ├── .env.forms
│   └── README.md
│
├── .gitignore
└── README.md                          # This file
```

---

## 📦 Dependencies

### Frontend
| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.1.0 | UI Framework |
| react-router-dom | 7.13.1 | Routing |
| axios | 1.13.6 | HTTP Client |
| tailwindcss | 4.2.1 | Styling |
| react-bootstrap | 2.10.10 | Bootstrap Components |
| sweetalert2 | 11.26.22 | Alert Dialogs |
| lucide-react | 0.577.0 | Icons |

### Backend
| Package | Version | Purpose |
|---------|---------|---------|
| express | 4.18.2 | Web Framework |
| mongoose | 8.0.0 | MongoDB ORM |
| dotenv | 16.3.1 | Environment Variables |
| bcryptjs | 2.4.3 | Password Hashing |
| jsonwebtoken | 9.0.0 | JWT Authentication |
| nodemailer | 6.9.7 | Email Sending |

---

## 🔧 API Endpoints

### Authentication Server (Port 5000)
```
POST   /api/auth/signup       - User registration
POST   /api/auth/login        - User login
POST   /api/career/apply      - Career application
```

### Forms Server (Port 5800)
```
POST   /api/booking/submit    - Booking form
POST   /api/contact/submit    - Contact form
GET    /api/states            - Get states dropdown
```

---

## 🌐 Environment Setup

### MongoDB Atlas Setup
1. Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/solarark`
4. Add to `.env` file

### Gmail Setup for Emails
1. Enable 2-Factor Authentication on Google Account
2. Generate App Password (not your regular password)
3. Add to `.env`:
   ```env
   GMAIL_USER=your_email@gmail.com
   GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

---

## 🏃 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start server
```

---

## 📖 Features

✅ **User Authentication**
- Secure signup/login with JWT
- Password hashing with bcryptjs
- Token-based authorization

✅ **Service Requests**
- Online booking system
- Career applications
- Customer inquiries

✅ **Email Notifications**
- Automated email confirmations
- Admin notifications
- Form submission alerts

✅ **Responsive Design**
- Mobile-friendly UI
- TailwindCSS styling
- Bootstrap components

✅ **Admin Features**
- Dashboard for submissions
- User management
- form analytics

---

## 🐛 Troubleshooting

### Issue: MongoDB Connection Error
**Solution:** 
- Check `.env` file has correct MongoDB URI
- Verify IP whitelist on MongoDB Atlas
- Ensure MongoDB service is running (local)

### Issue: Email Not Sending
**Solution:**
- Verify Gmail credentials in `.env`
- Check if 2FA is enabled on Google Account
- Use App Password, not regular password
- Allow "Less secure app access" if needed

### Issue: CORS Error
**Solution:**
- Frontend `axios` calls should match backend URL
- Backend has `cors` enabled by default
- Verify API endpoints in frontend code

### Issue: Vite Hot Module Reload Not Working
**Solution:**
```bash
cd SolarArk
npm install
npm run dev
```

---

## 📝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Open Pull Request

---

## 📄 License

This project is open source under the **ISC License**.

---

## 👤 Author

**Your Name**
- GitHub: [Your GitHub Profile]
- Email: [Your Email]

---

## 🤝 Support

For issues or questions:
1. Check existing [Issues](https://github.com/YOUR_USERNAME/SolarARK/issues)
2. Create a new issue with detailed description
3. Include error logs and screenshots if applicable

---

## 📞 Contact

- **Email:** support@solarark.com
- **Website:** [Coming Soon]
- **Phone:** [Your Phone Number]

---

**Last Updated:** April 2026  
**Status:** 🟢 Active Development
