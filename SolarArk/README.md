# SolarARK Frontend

Modern, responsive frontend for SolarARK solar energy solutions platform built with **React 19** and **Vite**.

**See full project documentation:** [../README.md](../README.md)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
```bash
npm install
npm run dev
```

Dev server runs on: **http://localhost:5173**

---

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.js       # Navigation bar (Client Component)
│   └── ...             # Other components
├── pages/              # Page components
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

---

## 🎨 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI Framework |
| **Vite** | Build tool & dev server |
| **TailwindCSS 4** | Utility-first CSS |
| **React Router** | Client-side routing |
| **Axios** | HTTP client |
| **Bootstrap 5** | UI Components |
| **Lucide Icons** | SVG Icon Library |

---

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production (dist/)
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

---

## 🔌 API Integration

Frontend connects to backend APIs:

```javascript
// Example: Login request
axios.post('http://localhost:5000/api/auth/login', {
  email: 'user@example.com',
  password: 'password'
})

// Example: Submit booking form
axios.post('http://localhost:5800/api/booking/submit', {
  name: 'John',
  email: 'john@example.com',
  // ... other fields
})
```

**Backend APIs:**
- Auth Server: `http://localhost:5000`
- Forms Server: `http://localhost:5800`

---

## 🎯 Features

✅ Hero sections with animations  
✅ Service showcases  
✅ Career application form  
✅ Booking system  
✅ Contact forms  
✅ Responsive design  
✅ Real-time counters  
✅ Sweet alerts  

---

## 🔧 Configuration

### Vite Config
Defined in `vite.config.js` with React Fast Refresh

### TailwindCSS
Defined in `tailwind.config.js` - customize theme here

### ESLint
Configured in `eslint.config.js` - JS/React best practices

---

## 📝 Component Guidelines

### Server vs Client Components

**Server Component** (default):
```javascript
// No "use client" - runs on server
export default function Home() {
  return <div>Server Component</div>
}
```

**Client Component** (interactive):
```javascript
"use client"  // Enable client-side features
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

---

## 🐛 Troubleshooting

### Issue: Vite HMR Not Working
```bash
npm install
npm run dev
```

### Issue: API Calls Failing
- Ensure backend servers are running
- Check CORS is enabled in backend
- Verify API endpoints in axios calls

### Issue: Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

---

## 📄 License

ISC License - See [LICENSE](../LICENSE)

---

**Last Updated:** April 2026
