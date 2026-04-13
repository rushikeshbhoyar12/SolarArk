# SolarARK Project Architecture

## 🏗️ Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React + Vite)                       │
│                      Port 5173 - localhost:5173                       │
│                                                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │ Index Page   │  │ Dashboard    │  │ Calculator   │  ...          │
│  │ - Booking    │  │ - Login      │  │ - States     │               │
│  │ - Contact    │  │ - Sign Up    │  │ - Formulas   │               │
│  │ - EarnWithUs │  │              │  │              │               │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘               │
│         │                  │                  │                       │
│         │ axios.post       │ axios.post       │ fetch()              │
│         │ /api/*           │ /api/auth/*      │ /api/states          │
│         │                  │                  │                       │
└─────────┼──────────────────┼──────────────────┼──────────────────────┘
          │                  │                  │
          │                  │                  │
    ┌─────▼──────────────────▼──────────────────▼──────────┐
    │     HTTP Requests (CORS enabled)                      │
    └──────────────────────────────────────────────────────┘
          │                                    │
          │                                    │
    ┌─────▼──────────────────┐         ┌───────▼────────────┐
    │  AUTH SERVER           │         │  FORMS SERVER      │
    │  Port: 5000            │         │  Port: 5800        │
    │                        │         │                    │
    │ ┌────────────────────┐ │         │ ┌────────────────┐ │
    │ │ Auth Routes        │ │         │ │ Form Routes    │ │
    │ │                    │ │         │ │                │ │
    │ │ POST /auth/signup  │ │         │ │ POST /send-    │ │
    │ │ POST /auth/login   │ │         │ │      email     │ │
    │ │ POST /careers      │ │         │ │ POST /contact  │ │
    │ │ GET /careers       │ │         │ │ GET /states    │ │
    │ │                    │ │         │ │                │ │
    │ └────────────────────┘ │         │ └────────────────┘ │
    │                        │         │                    │
    │ ┌────────────────────┐ │         │ ┌────────────────┐ │
    │ │ Middleware         │ │         │ │ SMTP (Email)   │ │
    │ │ - Express.js       │ │         │ │ - Nodemailer   │ │
    │ │ - CORS             │ │         │ │ - Gmail        │ │
    │ │ - JSON Parser      │ │         │ │                │ │
    │ │                    │ │         │ └────────────────┘ │
    │ └────────────────────┘ │         │                    │
    │                        │         │                    │
    │ ┌────────────────────┐ │         │                    │
    │ │ Security           │ │         │                    │
    │ │ - JWT Tokens       │ │         │                    │
    │ │ - Bcrypt Hash      │ │         │                    │
    │ │                    │ │         │                    │
    │ └────────────────────┘ │         │                    │
    └──────────┬─────────────┘         └──────────┬─────────┘
               │                                  │
               │                                  │
               │        MongoDB                    │
               │    (localhost:27017)              │
               │                                  │
         ┌─────▼──────────────────────────────────▼────┐
         │   Database Collections                      │
         │                                             │
         │  ┌──────────┐  ┌─────────────┐  ┌────────┐ │
         │  │ Users    │  │ Bookings    │  │Careers │ │
         │  │          │  │             │  │        │ │
         │  │ -name    │  │ -fullName   │  │-name   │ │
         │  │ -email   │  │ -email      │  │-email  │ │
         │  │ -password│  │ -phone      │  │-status │ │
         │  │ -token   │  │ -bill       │  │-date   │ │
         │  └──────────┘  └─────────────┘  └────────┘ │
         │                                             │
         │  ┌─────────────────────────────────────┐   │
         │  │ Contacts                            │   │
         │  │                                     │   │
         │  │ -name   -company  -email -city -pin│   │
         │  └─────────────────────────────────────┘   │
         │                                             │
         └─────────────────────────────────────────────┘
```

---

## 🔄 Request Flow Examples

### Example 1: Booking Form Submission (Port 5800)

```
User fills booking form in BookingForm.jsx
    ↓
Click "Submit" button
    ↓
handleSubmit() function triggered
    ↓
axios.post(`${BASE_URL}/api/send-email`, formData)
    ↓ (VITE_API_BASE_URL = http://localhost:5800)
    ↓
POST http://localhost:5800/api/send-email
    ↓
Express Route Handler (formServer.js)
    ↓
Save to MongoDB (Booking collection)
    ↓
Send Email via Nodemailer/Gmail SMTP
    ↓
Return Success Response
    ↓
Frontend shows SweetAlert2 success message
```

### Example 2: User Login (Port 5000)

```
User enters email & password in DashboardLogin.jsx
    ↓
Click "Login" button
    ↓
handleLogin() function triggered
    ↓
axios.post("http://localhost:5000/api/auth/login", {email, password})
    ↓
Express Route Handler (authServer.js)
    ↓
Find user in MongoDB (Users collection)
    ↓
Compare password using bcrypt
    ↓
Generate JWT Token
    ↓
Return Token to Frontend
    ↓
Frontend stores token in localStorage
    ↓
Frontend navigates to /dashboard
```

### Example 3: Fetch States (Port 5800)

```
SolarCalculator.jsx component mounts
    ↓
useEffect() hook runs
    ↓
fetch("http://localhost:5800/api/states")
    ↓
Express Route Handler (formServer.js)
    ↓
Return hardcoded states array
    ↓
Frontend stores in state
    ↓
Display in dropdown <select>
```

---

## 📦 Data Flow Summary

### Frontend → Backend Communication

1. **Frontend** sends HTTP request (POST/GET)
2. **Backend** receives and validates data
3. **Backend** interacts with MongoDB
4. **Backend** performs additional actions (email, etc.)
5. **Backend** sends response
6. **Frontend** handles response (success/error)
7. **Frontend** updates UI accordingly

### Types of Requests:

| Type | Purpose | Example |
|------|---------|---------|
| POST | Create/Submit | Booking, Contact, Signup |
| GET | Retrieve | States, Bookings (admin) |
| PUT | Update | Update user profile |
| DELETE | Remove | Delete booking |

---

## 🔐 Security Features

### Authentication (authServer.js)
- Passwords hashed with bcrypt (salt: 10 rounds)
- JWT tokens for session management
- Token expiry: 7 days
- Secure password comparison

### Form Validation
- Email format validation
- Phone number validation
- Required field checking
- SQL Injection prevention (MongoDB)

---

## 📚 Technologies Used

### Frontend
- React 19.1.0
- Vite 6.3.5
- Axios (HTTP client)
- Tailwind CSS (styling)
- React Router (navigation)
- SweetAlert2 (notifications)

### Backend
- Node.js
- Express.js (web framework)
- MongoDB (database)
- Mongoose (ODM)
- JWT (authentication)
- Bcryptjs (password hashing)
- Nodemailer (email)
- CORS (cross-origin)

---

## 🚀 Development Workflow

```
1. User makes action in React component
    ↓
2. Event handler called (handleSubmit, handleClick)
    ↓
3. Data collected and validated on frontend
    ↓
4. API request sent to backend
    ↓
5. Backend route handler processes request
    ↓
6. Database operations (Create/Read/Update/Delete)
    ↓
7. Additional actions (Email, calculations)
    ↓
8. Response sent back to frontend
    ↓
9. Frontend updates state/UI
    ↓
10. User sees result (success/error message)
```

---

## 📊 Port Assignment

```
5173  ← Frontend (React + Vite) - http://localhost:5173
5000  ← Auth Server (JavaScript) - http://localhost:5000
5800  ← Forms Server (JavaScript) - http://localhost:5800
27017 ← MongoDB (Database) - localhost:27017
```

---

## 🎯 Component-to-API Mapping

```
Frontend Component          API Endpoint              Port
─────────────────         ───────────────────────    ────
BookingForm.jsx        →  POST /api/send-email        5800
                          (Bookings collection)

ContactUs.jsx          →  POST /api/contactform       5800
                          (Contacts collection)

SolarCalculator.jsx    →  GET /api/states             5800
                          (Returns states array)

DashboardLogin.jsx     →  POST /api/auth/login        5000
                          (Users collection + JWT)

SignUp.jsx             →  POST /api/auth/signup       5000
                          (Users collection + JWT)

Careers.jsx            →  POST /api/careers           5000
                          (Careers collection)

EarnWithUs.jsx         →  POST /api/careers           5000
                          (Careers collection)
```

---

## 👥 User Journeys

### New User Flow
```
SignUp.jsx → authServer:signup → MongoDB (save user) → JWT token → Dashboard
```

### Returning User Flow
```
DashboardLogin.jsx → authServer:login → Check password → JWT token → Dashboard
```

### Booking Inquiry Flow
```
BookingForm.jsx → formServer:send-email → MongoDB (save) → Gmail (send email) → SweetAlert (success)
```

---

This architecture ensures:
- ✅ Separation of concerns (Auth vs Forms)
- ✅ Scalability (can run independently)
- ✅ Security (JWT, bcrypt, CORS)
- ✅ Maintainability (clear structure)
- ✅ Reliability (error handling)
