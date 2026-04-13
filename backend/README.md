# SolarARK Backend API

Express.js + MongoDB backend for SolarARK solar energy solutions platform.

**Main Project:** [../README.md](../README.md)  
**Frontend:** [../SolarArk/README.md](../SolarArk/README.md)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (Local or Atlas)

### Installation
```bash
npm install
```

### Setup Environment
Create `.env` files:

**`.env.auth`** (Auth Server - Port 5000)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/solarark
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
PORT=5000
```

**`.env.forms`** (Forms Server - Port 5800)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/solarark
GMAIL_USER=your_email@gmail.com
GMAIL_PASSWORD=your_app_password_here
NODE_ENV=development
PORT=5800
```

### Start Servers

**Windows:**
```bash
run-servers.bat
```

**Mac/Linux:**
```bash
# Terminal 1: Auth Server
npm run dev
# or
node authServer.js

# Terminal 2: Forms Server
node formServer.js
```

---

## 🏗️ Server Architecture

### Auth Server (Port 5000)
**File:** `authServer.js`

Handles user authentication and career applications.

**Endpoints:**
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/career/apply
GET    /api/users
```

**Dependencies:** Express, Mongoose, JWT, Bcryptjs

---

### Forms Server (Port 5800)
**File:** `formServer.js`

Handles form submissions and email notifications.

**Endpoints:**
```
POST   /api/booking/submit
POST   /api/contact/submit
GET    /api/states
```

**Dependencies:** Express, Mongoose, Nodemailer

---

### Admin Server (Optional)
**File:** `adminServer.js`

Dashboard for admin operations (future development).

---

### Main Server (Optional)
**File:** `server.js`

Central server for all endpoints (can consolidate into one).

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **express** | 4.18.2 | Web server framework |
| **mongoose** | 8.0.0 | MongoDB object modeling |
| **dotenv** | 16.3.1 | Environment variables |
| **cors** | 2.8.5 | Cross-origin requests |
| **bcryptjs** | 2.4.3 | Password hashing |
| **jsonwebtoken** | 9.0.0 | JWT authentication |
| **nodemailer** | 6.9.7 | Email sending |
| **validator** | 13.11.0 | Input validation |
| **nodemon** | 3.0.1 | Auto-reload (dev only) |

---

## 📁 Project Structure

```
backend/
├── server.js              # Main/consolidated server
├── authServer.js          # Authentication API
├── formServer.js          # Forms/booking API
├── adminServer.js         # Admin dashboard
├── migrate.js             # Database migrations
├── package.json
├── .env.auth             # Auth server config
├── .env.forms            # Forms server config
├── .env.admin            # Admin config (optional)
├── run-servers.bat       # Windows batch runner
├── README.md             # This file
└── node_modules/         # Dependencies
```

---

## 🔐 Authentication

### JWT Flow
```
1. User signs up → Password hashed with bcryptjs
2. User logs in → JWT token generated
3. Token sent to frontend
4. Frontend includes token in Authorization header
5. Backend verifies token with JWT_SECRET
```

### Password Security
- Passwords hashed with **bcryptjs** (10 salt rounds)
- Never store plain text passwords
- Use `bcryptjs.compare()` for login

---

## 📧 Email Setup

### Gmail Configuration
1. **Enable 2-Factor Authentication**
   - Go to Google Account settings
   - Security → 2-Step Verification

2. **Generate App Password**
   - Security settings → App passwords
   - Select "Mail" and "Windows"
   - Copy 16-character password

3. **Add to .env.forms**
   ```env
   GMAIL_USER=your_email@gmail.com
   GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

### Email Templates
Nodemailer sends emails to:
- Users: Booking/contact confirmation
- Admin: New submission notifications

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Career Applications
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  position: String,
  resume: String (URL/base64),
  message: String,
  submittedAt: Date
}
```

### Bookings
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  serviceType: String,
  date: Date,
  address: String,
  submittedAt: Date
}
```

### Contact Forms
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  message: String,
  submittedAt: Date
}
```

---

## 📝 API Usage Examples

### Signup
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Secure123!"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Secure123!"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Submit Booking
```bash
POST /api/booking/submit
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543210",
  "serviceType": "Solar Panel Installation",
  "date": "2026-05-15",
  "address": "123 Main St, City"
}

Response:
{
  "message": "Booking submitted successfully",
  "bookingId": "507f1f77bcf86cd799439011"
}
```

### Get States (Dropdown)
```bash
GET /api/states

Response:
{
  "states": ["Maharashtra", "Tamil Nadu", "Gujarat", ...]
}
```

---

## 🚨 Error Handling

All endpoints return structured error responses:

```javascript
{
  "error": "Error message",
  "statusCode": 400
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

---

## 🔧 Available Scripts

```bash
npm run dev    # Start with nodemon (auto-reload)
npm start      # Start server normally
```

---

## 🐛 Troubleshooting

### Issue: MongoDB Connection Error
```
Connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Verify MongoDB URI in `.env`
- For local: ensure MongoDB service is running
- For Atlas: check IP whitelist and credentials

### Issue: Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Change port in `.env`
- Or kill process: `lsof -i :5000 | grep -v PID | awk '{print $2}' | xargs kill`

### Issue: Email Not Sending
**Solution:**
- Verify Gmail credentials
- Check 2FA is enabled
- Use App Password, not regular password
- Check SMTP settings: smtp.gmail.com:587

### Issue: CORS Errors
**Solution:**
- CORS is enabled by default in servers
- Verify frontend URL in CORS config
- Check request headers

### Issue: JWT Token Expired
**Solution:**
- Frontend should store token securely
- Implement refresh token logic
- Clear token on logout

---

## 📚 Resources

- [Express.js Docs](https://expressjs.com)
- [Mongoose Docs](https://mongoosejs.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Nodemailer Docs](https://nodemailer.com)
- [JWT Guide](https://jwt.io)

---

## 📄 License

ISC License

---

**Last Updated:** April 2026  
**Status:** 🟢 Active Development
- Add to `.env.forms` as `SMTP_PASSWORD`

### 3. Update .env Files
```
.env.auth     - Auth server configuration
.env.forms    - Forms server configuration  
```

## Database Models

### User (Authentication)
```
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Booking
```
{
  fullName: String,
  email: String,
  phoneNumber: String,
  pinCode: String,
  city: String,
  electricBill: String,
  submittedAt: Date
}
```

### Contact
```
{
  name: String,
  companyName: String,
  whatsAppNumber: String,
  city: String,
  companyPinCode: String,
  averageElectricBill: String,
  submittedAt: Date
}
```

### Career
```
{
  name: String,
  email: String,
  jobPosition: String,
  experience: String,
  message: String,
  status: String (pending/reviewed),
  submittedAt: Date
}
```

## API Documentation

See `SETUP_GUIDE.md` for complete API documentation with examples.

## Troubleshooting

**Q: Port 5000/5800 already in use?**
A: Change port in `.env` files or kill existing process

**Q: MongoDB connection failed?**
A: Ensure MongoDB is running or check connection string

**Q: Emails not sending?**
A: Verify Gmail app password and less secure access settings

## Frontend Integration

Update frontend `.env`:
```
VITE_API_BASE_URL=http://localhost:5800
```

This tells the frontend where to send API requests!

## Production Checklist

- [ ] Use strong JWT_SECRET
- [ ] Setup MongoDB Atlas
- [ ] Use production email service
- [ ] Enable CORS with specific origins
- [ ] Add rate limiting
- [ ] Use HTTPS
- [ ] Setup proper logging
- [ ] Add request validation
- [ ] Setup monitoring/alerts

## Support

For issues or questions, check `SETUP_GUIDE.md` or `PROJECT_ANALYSIS.md`

---

**Made with ❤️ for SolarARK**
