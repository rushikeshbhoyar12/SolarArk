# SolarARK Backend Setup Guide

## Prerequisites
- Node.js v16+ ([Download](https://nodejs.org/))
- MongoDB ([Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas free tier)
- npm or yarn package manager

---

## Installation Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB Community Edition
# https://www.mongodb.com/docs/manual/installation/

# Start MongoDB service (Windows):
mongod

# Or on Mac:
brew services start mongodb-community

# Or on Linux:
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/solarark`
5. Update `.env.auth` and `.env.forms` with this URI

### 3. Configure Environment Variables

#### For Auth Server (Port 5000):
Edit `.env.auth`:
```
MONGODB_URI=mongodb://localhost:27017/solarark
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=5000
NODE_ENV=development
```

#### For Forms Server (Port 5800):
Edit `.env.forms`:
```
MONGODB_URI=mongodb://localhost:27017/solarark
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=admin@solarark.com
PORT=5800
NODE_ENV=development
```

### 4. Gmail App Password (For Email Sending)
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Create app-specific password for Gmail
4. Copy and paste in `.env.forms` as `SMTP_PASSWORD`

---

## Running the Servers

### Option 1: Run Both Servers (Recommended)

Create a file `run-servers.bat` (Windows) or `run-servers.sh` (Mac/Linux):

**Windows (run-servers.bat):**
```batch
@echo off
echo Starting SolarARK Backend Servers...
start "Auth Server" cmd /k "set NODE_ENV=development && node authServer.js"
start "Forms Server" cmd /k "set NODE_ENV=development && node formServer.js"
echo Both servers started!
echo Auth Server: http://localhost:5000
echo Forms Server: http://localhost:5800
pause
```

Then run:
```bash
./run-servers.bat
```

**Mac/Linux (run-servers.sh):**
```bash
#!/bin/bash
echo "Starting SolarARK Backend Servers..."
NODE_ENV=development node authServer.js &
NODE_ENV=development node formServer.js &
echo "Both servers started!"
echo "Auth Server: http://localhost:5000"
echo "Forms Server: http://localhost:5800"
```

Then run:
```bash
chmod +x run-servers.sh
./run-servers.sh
```

### Option 2: Run Servers Separately

Terminal 1 (Auth Server):
```bash
cd backend
node authServer.js
```

Terminal 2 (Forms Server):
```bash
cd backend
node formServer.js
```

---

## API Endpoints Reference

### Auth Server (Port 5000)

**1. Signup**
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password"
}

Response:
{
  "message": "Signup successful!",
  "token": "eyJhbGc...",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

**2. Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}

Response:
{
  "message": "Login successful!",
  "token": "eyJhbGc...",
  "user": { "id": "...", "name": "John Doe" }
}
```

**3. Career Application**
```
POST /api/careers
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "jobPosition": "Solar Engineer",
  "experience": "5 years",
  "message": "Interested in joining your team"
}

Response:
{
  "message": "Career application submitted successfully!"
}
```

### Forms Server (Port 5800)

**1. Get States**
```
GET /api/states

Response:
[
  { "_id": 1, "name": "Andhra Pradesh" },
  { "_id": 2, "name": "Arunachal Pradesh" },
  ...
]
```

**2. Booking Form**
```
POST /api/send-email
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "9876543210",
  "pinCode": "123456",
  "city": "Mumbai",
  "electricBill": "5000"
}

Response:
{
  "message": "Booking inquiry submitted successfully!"
}
```

**3. Contact Form**
```
POST /api/contactform
Content-Type: application/json

{
  "name": "John Doe",
  "companyName": "XYZ Company",
  "whatsAppNumber": "9876543210",
  "city": "Mumbai",
  "companyPinCode": "123456",
  "averageElectricBill": "50000"
}

Response:
{
  "message": "Contact form submitted successfully!"
}
```

---

## Frontend Configuration

Update `.env` in your React project:
```
VITE_API_BASE_URL=http://localhost:5800
```

---

## Testing the APIs

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Import the API endpoints
3. Test each endpoint with sample data

### Using cURL

```bash
# Test Auth Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Test Get States
curl http://localhost:5800/api/states

# Test Booking Form
curl -X POST http://localhost:5800/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John","email":"john@example.com","phoneNumber":"9876543210","pinCode":"123456","city":"Mumbai","electricBill":"5000"}'
```

---

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check connection string in `.env` files
- Verify MongoDB service is active

### Port Already in Use
```bash
# Kill process on port 5000 (Windows):
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 5800:
netstat -ano | findstr :5800
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### Email Not Sending
- Use Gmail app-specific password (not regular password)
- Enable less secure app access if needed
- Check SMTP credentials in `.env.forms`

---

## Production Deployment

Before deploying:
1. Change `NODE_ENV` to `production`
2. Use strong `JWT_SECRET`
3. Use MongoDB Atlas (cloud database)
4. Set proper admin email
5. Use environment variables from hosting provider
6. Enable HTTPS
7. Add rate limiting and validation

---

## Next Steps

- ✅ Setup and run backend servers
- ✅ Test API endpoints
- ✅ Update frontend `.env` with API URLs
- ✅ Test full workflow end-to-end
- ✅ Deploy to production when ready
