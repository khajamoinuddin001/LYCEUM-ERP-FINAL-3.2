# Deployment Guide - Lyceum Academy

## 🚀 Quick Start Deployment

This project is now **fully multi-user ready** with a backend API and database!

### Architecture
- **Frontend**: React + Vite (TypeScript)
- **Backend**: Node.js + Express
- **Database**: SQLite (can be upgraded to PostgreSQL)
- **Authentication**: JWT tokens

---

## 📋 Pre-Deployment Checklist

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Environment Variables

**Frontend** (`.env` or `.env.local`):
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=your_razorpay_key
```

**Backend** (`server/.env`):
```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=5000
NODE_ENV=production
```

### 3. Initialize Database

The database will be automatically created when you start the server for the first time.

---

## 🏃 Local Development

### Start Backend Server
```bash
cd server
npm install
npm run dev
# Server runs on http://localhost:5000
```

### Start Frontend
```bash
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

---

## 🌐 Production Deployment Options

### Option 1: Railway (Recommended - Easiest)

1. **Create Railway Account**: https://railway.app
2. **Create New Project**
3. **Add PostgreSQL Database** (or use SQLite for small apps)
4. **Deploy Backend**:
   - Connect your GitHub repo
   - Set root directory to `server`
   - Set start command: `npm start`
   - Add environment variables
5. **Deploy Frontend**:
   - Add another service
   - Set root directory to root
   - Set build command: `npm run build`
   - Set start command: `npm run preview`
   - Add environment variables

### Option 2: Render

1. **Backend Service**:
   - New Web Service
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node

2. **Frontend Static Site**:
   - New Static Site
   - Build Command: `npm run build`
   - Publish Directory: `dist`

### Option 3: Vercel (Frontend) + Railway/Render (Backend)

1. **Deploy Backend** to Railway or Render (see above)
2. **Deploy Frontend** to Vercel:
   - Import your GitHub repo
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add environment variables

### Option 4: Self-Hosted (VPS)

1. **Setup Server** (Ubuntu/Debian):
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

2. **Clone and Setup**:
```bash
git clone your-repo
cd lyceum-academy-fully-functional
npm install
cd server
npm install
```

3. **Start Backend**:
```bash
cd server
pm2 start server.js --name lyceum-backend
pm2 save
```

4. **Build and Serve Frontend**:
```bash
npm run build
# Serve dist/ folder with nginx or serve it from backend
```

5. **Setup Nginx** (optional):
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
    }
}
```

---

## 🔧 Environment Variables for Production

### Frontend (Vercel/Railway/Render)
- `VITE_API_URL` - Your backend API URL (e.g., `https://your-backend.railway.app/api`)
- `VITE_RAZORPAY_KEY` - Your Razorpay production key

### Backend (Railway/Render/VPS)
- `JWT_SECRET` - Strong random string (use: `openssl rand -base64 32`)
- `PORT` - Port number (usually auto-set by hosting)
- `NODE_ENV` - Set to `production`

---

## 📦 Build Commands

### Frontend
```bash
npm run build
# Output: dist/ folder
```

### Backend
```bash
cd server
npm start
# Runs on PORT from environment or 5000
```

---

## 🗄️ Database Migration (Optional - Upgrade to PostgreSQL)

If you want to use PostgreSQL instead of SQLite:

1. **Install PostgreSQL driver**:
```bash
cd server
npm install pg
```

2. **Update `server/database.js`** to use PostgreSQL connection instead of SQLite

3. **Set DATABASE_URL** environment variable:
```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

---

## ✅ Post-Deployment

1. **Create Admin User**:
   - Register first user manually or
   - Use database to set role to 'Admin'

2. **Test Authentication**:
   - Try logging in
   - Try registering a new student
   - Verify data persists

3. **Monitor Logs**:
   - Check server logs for errors
   - Monitor database size

---

## 🔒 Security Checklist

- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Use HTTPS in production
- [ ] Set `NODE_ENV=production`
- [ ] Don't commit `.env` files
- [ ] Use environment variables for all secrets
- [ ] Enable CORS only for your frontend domain
- [ ] Regularly backup database

---

## 🆘 Troubleshooting

### Backend won't start
- Check `PORT` environment variable
- Verify all dependencies installed
- Check database file permissions

### Frontend can't connect to backend
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Verify backend is running

### Authentication fails
- Check JWT_SECRET is set
- Verify token is being sent in headers
- Check token expiration

---

## 📞 Support

For issues, check:
1. Server logs
2. Browser console
3. Network tab in DevTools

---

**Your app is now ready for multi-user production! 🎉**


