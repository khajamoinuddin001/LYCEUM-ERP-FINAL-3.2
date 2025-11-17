# 🎥 Video-Style Step-by-Step: Going Live

Think of this like following a recipe - just do each step one at a time!

---

## 🎯 The Big Picture

You have 2 parts:
1. **Backend** (the brain) - stores data
2. **Frontend** (the face) - what users see

We'll put both on Railway (like a free hosting service).

---

## 📦 STEP 1: Get Your Code Ready (Like Packing a Suitcase)

### What You're Doing:
Putting your code on GitHub so Railway can see it.

### How:
1. **Go to GitHub.com** → Sign up (free)
2. **Click the "+" button** → "New repository"
3. **Name it:** `lyceum-academy`
4. **Click "Create repository"**

### Upload Your Code:

**EASIEST WAY - Use GitHub Desktop:**
1. Download: https://desktop.github.com
2. Install it
3. Open GitHub Desktop
4. Click "File" → "Add Local Repository"
5. Find your folder: `lyceum-academy fully functional`
6. Click "Publish repository"
7. ✅ Done!

**Your code is now on GitHub!** (Like putting photos in the cloud)

---

## 🏗️ STEP 2: Build the Backend (The Brain)

### What You're Doing:
Putting your backend on Railway so it can store data.

### How:

1. **Go to Railway.app** → Sign up with GitHub
2. **Click "New Project"**
3. **Click "Deploy from GitHub repo"**
4. **Select your repository** (`lyceum-academy`)
5. **Click "Add Service"** → **"Empty Service"**
6. **Click on the service** you just created
7. **Go to "Settings" tab**
8. **Set "Root Directory"** to: `server`
9. **Go to "Variables" tab** → Add these:

```
JWT_SECRET = my-super-secret-key-12345
PORT = 5000
NODE_ENV = production
```

10. **Go to "Deploy" tab** → Click "Deploy"
11. **Wait 2 minutes** (like waiting for pizza to cook)
12. **Click "Generate Domain"** → Copy the URL
13. **✅ Backend is live!**

**Save that URL!** (It looks like: `https://something.railway.app`)

---

## 🎨 STEP 3: Build the Frontend (The Face)

### What You're Doing:
Putting your frontend on Railway so people can see it.

### How:

1. **In Railway, click "New"** → **"Empty Service"**
2. **Click on the new service**
3. **Go to "Settings" tab**
4. **Set "Root Directory"** to: `.` (just a dot)
5. **Set "Build Command"** to: `npm install && npm run build`
6. **Set "Start Command"** to: `npm run preview`
7. **Go to "Variables" tab** → Add:

```
VITE_API_URL = https://YOUR-BACKEND-URL.railway.app/api
```
(Replace YOUR-BACKEND-URL with the URL from Step 2!)

8. **Go to "Deploy" tab** → Click "Deploy"
9. **Wait 2 minutes**
10. **Click "Generate Domain"** → Copy the URL
11. **✅ Frontend is live!**

**THIS IS YOUR LIVE APP URL!** 🎉

---

## 🧪 STEP 4: Test It (Like Tasting Your Cooking)

1. **Open the frontend URL** in your browser
2. **Try to register** a new account
3. **Try to login**
4. **If it works** → You're done! 🎉

---

## 🎁 BONUS: Custom Domain (Optional)

Want a nice URL like `myacademy.com`?

1. Buy a domain from Namecheap or GoDaddy
2. In Railway, go to your frontend service
3. Click "Settings" → "Domains"
4. Click "Custom Domain"
5. Enter your domain
6. Follow the instructions to connect it

---

## 💡 Pro Tips

- **Keep your URLs safe** - Don't share them publicly if you don't want to
- **Check Railway logs** if something breaks (click service → "Deployments" → latest)
- **Free tier is enough** for testing and small apps
- **Backup your code** - It's already on GitHub! ✅

---

## 🆘 Help! Something's Wrong!

### "Build Failed"
→ Check Railway logs (click service → "Deployments" → latest deployment → "View Logs")

### "Can't Login"
→ Make sure `VITE_API_URL` has the correct backend URL (should end with `/api`)

### "Page Not Found"
→ Make sure both services are deployed and have domains

### "Database Error"
→ Database creates automatically, check Railway logs for details

---

## ✅ Final Checklist

Before you celebrate:

- [ ] Code is on GitHub
- [ ] Backend is deployed on Railway
- [ ] Backend has environment variables set
- [ ] Backend has a domain/URL
- [ ] Frontend is deployed on Railway
- [ ] Frontend has `VITE_API_URL` set correctly
- [ ] Frontend has a domain/URL
- [ ] You can open the frontend URL and see your app
- [ ] You can register and login

**If all checked → YOU'RE LIVE! 🚀🎉**

---

## 🎓 What You Just Learned

You learned how to:
- Put code on GitHub (like Google Drive for code)
- Deploy backend (the brain that stores data)
- Deploy frontend (the pretty face users see)
- Connect them together

**You're now a developer who can deploy apps!** 🎉

---

**Need more help? Check the logs in Railway - they tell you what's wrong!**


