# 🚀 Quick Start Guide

## Get Your App Running in 5 Minutes!

### Step 1: Install Dependencies

```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

### Step 2: Create Environment Files

**Create `.env` in root:**
```env
VITE_API_URL=http://localhost:5000/api
```

**Create `server/.env`:**
```env
JWT_SECRET=change-this-to-a-random-string
PORT=5000
```

### Step 3: Start Backend

```bash
cd server
npm run dev
```

You should see: `🚀 Server running on port 5000`

### Step 4: Start Frontend (New Terminal)

```bash
npm run dev
```

You should see: `Local: http://localhost:3000`

### Step 5: Open Browser

Go to: **http://localhost:3000**

### Step 6: Register First User

1. Click "Register"
2. Enter name, email, password
3. You'll be logged in as a Student
4. To make yourself Admin, update the database or use Access Control (if you have admin access)

## ✅ That's It!

Your multi-user academy management system is now running!

## 🐛 Troubleshooting

**Backend won't start?**
- Check if port 5000 is available
- Make sure you're in the `server` directory
- Check `server/.env` exists

**Frontend can't connect?**
- Make sure backend is running
- Check `VITE_API_URL` in `.env`
- Check browser console for errors

**Database errors?**
- Database is auto-created on first run
- Check file permissions in `server/` directory

## 📚 Next Steps

- See [README.md](./README.md) for full documentation
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment

---

**Happy Coding! 🎉**


