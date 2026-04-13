# SolarARK Project Analysis & API Requirements

## Project Overview
**Frontend**: React + Vite (Port 5173)
**Technology Stack**: React, React Router, Axios, Tailwind CSS, SweetAlert2

---

## API Endpoints Required

### 1. **Authentication APIs** (Port: 5000)
- **POST** `/api/auth/signup` - User Registration
  - Input: `{ name, email, password }`
  - Output: `{ message, token }`
  
- **POST** `/api/auth/login` - User Login
  - Input: `{ email, password }`
  - Output: `{ message, token, user }`

### 2. **Form Submission APIs** (Port: 5800)
- **POST** `/api/send-email` - Booking Form Submission
  - Input: `{ fullName, email, phoneNumber, pinCode, city, electricBill }`
  - Action: Send email confirmation
  
- **POST** `/api/contactform` - Contact Us Form
  - Input: `{ name, companyName, whatsAppNumber, city, companyPinCode, averageElectricBill }`
  - Action: Store in DB + Send email
  
- **GET** `/api/states` - Fetch States List
  - Output: Array of states `{ _id, name }`

### 3. **Career APIs** (Port: 5000)
- **POST** `/api/careers` - Career Application
  - Input: `{ name, email, password }` (should include resume/details)
  - Action: Store application + Send email

---

## Frontend Components Using APIs

| Component | API Called | Method | Purpose |
|-----------|-----------|--------|---------|
| BookingForm | `/api/send-email` (Port 5800) | POST | Send booking inquiry |
| ContactUs | `/api/contactform` (Port 5800) | POST | Submit contact form |
| SolarCalculator | `/api/states` (Port 5800) | GET | Fetch states dropdown |
| DashboardLogin | `/api/auth/login` (Port 5000) | POST | User authentication |
| SignUp | `/api/auth/signup` (Port 5000) | POST | New user registration |
| Careers | `/api/careers` (Port 5000) | POST | Job application |

---

## Environment Variables Needed

### Frontend (.env in SolarArk/):
```
VITE_API_BASE_URL=http://localhost:5800
```

### Backend (.env files):
**Port 5000** (Auth + Careers):
```
MONGODB_URI=mongodb://localhost:27017/solarark
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

**Port 5800** (Forms + States):
```
MONGODB_URI=mongodb://localhost:27017/solarark
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
PORT=5800
NODE_ENV=development
```

---

## Database Models Required

### User (Authentication)
- name
- email
- password (hashed)
- createdAt

### Booking Form
- fullName
- email
- phoneNumber
- pinCode
- city
- electricBill
- submittedAt

### Contact Form
- name
- companyName
- whatsAppNumber
- city
- companyPinCode
- averageElectricBill
- submittedAt

### Career Application
- name
- email
- resume/details
- submittedAt
- status (pending/reviewed/rejected)

---

## Next Steps
1. Create Node.js + Express backend structure
2. Setup MongoDB database
3. Configure authentication (JWT)
4. Create API routes
5. Setup email service (Nodemailer)
6. Implement validation & error handling
