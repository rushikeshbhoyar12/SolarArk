# Backend Setup Summary

## ✅ What Was Created

Your SolarARK backend is now ready! Here's what I've created:

### Backend Structure
```
SolarARK/backend/
├── authServer.js              # Authentication & Careers API (Port 5000)
├── formServer.js              # Forms & States API (Port 5800)
├── package.json               # Dependencies configuration
├── .env.auth                  # Auth server environment variables
├── .env.forms                 # Forms server environment variables
├── run-servers.bat            # Windows startup script
├── README.md                  # Quick start guide
├── SETUP_GUIDE.md            # Detailed setup instructions
└── PROJECT_ANALYSIS.md        # Complete project analysis
```

### Frontend Updates
```
SolarARK/SolarArk/
└── .env                       # Added VITE_API_BASE_URL=http://localhost:5800
```

---

## 📊 API Architecture

### Port 5000 - Auth Server
**Endpoints:**
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/careers` - Career applications
- `GET /api/careers` - Get all career applications (admin)

**Used By:**
- SignUp.jsx
- DashboardLogin.jsx
- Careers.jsx

### Port 5800 - Forms Server
**Endpoints:**
- `POST /api/send-email` - Booking form submission
- `POST /api/contactform` - Contact form submission
- `GET /api/states` - Fetch states list
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/contacts` - Get all contacts (admin)

**Used By:**
- BookingForm.jsx
- ContactUs.jsx
- SolarCalculator.jsx
- EarnWithUs.jsx

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
cd SolarARK/backend
npm install
```

### Step 2: Setup MongoDB
- **Option A:** Install locally & run `mongod`
- **Option B:** Use MongoDB Atlas (free cloud)
- Update connection string in `.env.auth` and `.env.forms`

### Step 3: Run Servers
**Windows:**
```bash
cd SolarARK/backend
run-servers.bat
```

**Mac/Linux:**
```bash
# Terminal 1
cd SolarARK/backend
node authServer.js

# Terminal 2
cd SolarARK/backend
node formServer.js
```

---

## 📧 Email Setup (For Forms Server)

To enable email notifications:

1. Go to [Gmail Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Create an App Password (not regular password!)
4. Copy the 16-character password
5. Update `.env.forms`:
   ```
   SMTP_EMAIL=your-email@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   ```

---

## 🔗 How Frontend Connects to Backend

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5800
```

### Frontend Code (Example)
```javascript
// BookingForm.jsx
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
await axios.post(`${BASE_URL}/api/send-email`, formData);
```

### DashboardLogin (Port 5000)
```javascript
// Uses hardcoded URL for auth:
await axios.post("http://localhost:5000/api/auth/login", { email, password });
```

---

## 📚 Database Collections

After first run, MongoDB will create:
- `users` - User accounts
- `bookings` - Booking form submissions
- `contacts` - Contact form submissions
- `careers` - Career applications

---

## ✅ Testing the APIs

### Check if Auth Server is Running
```bash
curl http://localhost:5000/health
# Response: {"message":"Auth Server is running"}
```

### Check if Forms Server is Running
```bash
curl http://localhost:5800/health
# Response: {"message":"Forms Server is running"}
```

### Test Booking Form API
```bash
curl -X POST http://localhost:5800/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "fullName":"John Doe",
    "email":"john@example.com",
    "phoneNumber":"9876543210",
    "pinCode":"123456",
    "city":"Mumbai",
    "electricBill":"5000"
  }'
```

---

## 🎯 What Each Component Does

### authServer.js
- Handles user registration with password hashing (bcrypt)
- Generates JWT tokens for authentication
- Stores user data in MongoDB
- Handles career applications

### formServer.js
- Saves booking & contact forms to MongoDB
- Sends confirmation emails via Gmail SMTP
- Provides states list for dropdown
- Sends admin notifications

---

## 🔧 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 5000 already in use | Change PORT in `.env.auth` or `netstat -ano \| findstr :5000` |
| MongoDB connection failed | Ensure mongod is running or update MONGODB_URI |
| Emails not sending | Check Gmail app password & enable 2FA |
| CORS errors | Add frontend origin to express cors() setup |
| Cannot find module | Run `npm install` in backend folder |

---

## 📝 Next Steps

1. **✅ Install dependencies** - `npm install`
2. **✅ Setup MongoDB** - Local or Atlas
3. **✅ Configure .env files** - Update SMTP & JWT settings
4. **✅ Run servers** - `run-servers.bat` or `node authServer.js`
5. **✅ Test APIs** - Use curl or Postman
6. **✅ Test frontend** - Run `npm run dev` in SolarArk folder
7. **✅ Full integration test** - Submit forms from frontend
8. **✅ Deploy** - When ready

---

## 📖 Documentation Files

- **README.md** - Quick start guide
- **SETUP_GUIDE.md** - Detailed setup with examples
- **PROJECT_ANALYSIS.md** - API requirements analysis

---

## 🎓 Learning Tips

- Read `authServer.js` to understand JWT authentication
- Read `formServer.js` to understand email sending
- Use Postman to test APIs before linking frontend
- Check browser DevTools Network tab for API calls
- Monitor MongoDB with MongoDB Compass (free GUI)

---

## 💡 Important Reminders

1. **Never commit .env files** to GitHub (they contain secrets!)
2. **Use strong JWT_SECRET** in production
3. **Use MongoDB Atlas** for production (not local)
4. **Enable HTTPS** before going live
5. **Add rate limiting** to prevent abuse
6. **Validate all inputs** on backend

---

**Your SolarARK Backend is ready to go! 🚀**

Any questions? Check the SETUP_GUIDE.md or PROJECT_ANALYSIS.md files!
