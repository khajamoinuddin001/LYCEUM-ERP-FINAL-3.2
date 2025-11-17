# 🆓 Go Live for FREE - Step by Step Guide

**100% FREE hosting using Render.com (no credit card needed!)**

---

## 🎯 What We'll Use

- **Render.com** - Free hosting for both backend and frontend
- **No credit card required!**
- **Completely free forever!**

---

## STEP 1: Sign Up for Render (2 minutes)

1. Go to: **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (click "Continue with GitHub")
4. Allow Render to access your GitHub
5. ✅ You're signed up!

---

## STEP 2: Deploy Backend (10 minutes)

### 2.1 Create Backend Service

1. In Render dashboard, click **"New +"** button (top right)
2. Click **"Web Service"**
3. Click **"Connect account"** if asked
4. Select your GitHub repository: `lyceum-academy`
5. Click **"Connect"**

### 2.2 Configure Backend

Fill in these settings:

**Name:**
```
lyceum-backend
```

**Root Directory:**
```
server
```

**Environment:**
```
Node
```

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

**Plan:**
- Select **"Free"** (it's free forever!)

### 2.3 Add Environment Variables

Scroll down to **"Environment Variables"** section:

Click **"Add Environment Variable"** and add these one by one:

**Variable 1:**
- Key: `JWT_SECRET`
- Value: `my-super-secret-key-12345-change-this`

**Variable 2:**
- Key: `PORT`
- Value: `10000`
(Note: Render uses port 10000, not 5000!)

**Variable 3:**
- Key: `NODE_ENV`
- Value: `production`

### 2.4 Deploy

1. Scroll to bottom
2. Click **"Create Web Service"**
3. Wait 3-5 minutes (it's building your app)
4. ✅ Backend is deploying!

### 2.5 Get Your Backend URL

1. Wait for deployment to finish (you'll see "Live" status)
2. At the top, you'll see a URL like: `https://lyceum-backend.onrender.com`
3. **COPY THIS URL!** Save it somewhere!
4. Add `/api` to the end: `https://lyceum-backend.onrender.com/api`
5. **This is your backend API URL!**

---

## STEP 3: Deploy Frontend (10 minutes)

### 3.1 Create Frontend Service

1. In Render dashboard, click **"New +"** again
2. Click **"Static Site"** (not Web Service!)
3. Select your GitHub repository: `lyceum-academy`
4. Click **"Connect"**

### 3.2 Configure Frontend

Fill in these settings:

**Name:**
```
lyceum-frontend
```

**Root Directory:**
```
.` (leave empty or put just a dot)
```

**Build Command:**
```
npm install && npm run build
```

**Publish Directory:**
```
dist
```

**Environment:**
- Click **"Add Environment Variable"**
- Key: `VITE_API_URL`
- Value: `https://YOUR-BACKEND-URL.onrender.com/api`
  (Replace YOUR-BACKEND-URL with the URL from Step 2.5!)

**Plan:**
- Select **"Free"**

### 3.3 Deploy

1. Scroll to bottom
2. Click **"Create Static Site"**
3. Wait 3-5 minutes
4. ✅ Frontend is deploying!

### 3.4 Get Your Frontend URL

1. Wait for deployment to finish
2. At the top, you'll see a URL like: `https://lyceum-frontend.onrender.com`
3. **THIS IS YOUR LIVE APP URL!** 🎉
4. Click it to see your app!

---

## STEP 4: Test Your Live App (2 minutes)

1. Open your frontend URL in a browser
2. You should see your login page
3. Try to register a new account
4. Try to login
5. If it works → **YOU'RE LIVE FOR FREE!** 🎉

---

## 🎉 CONGRATULATIONS!

Your app is now live on the internet - **completely FREE!**

Share your frontend URL with anyone!

---

## 🆘 Troubleshooting

### "Build Failed"
- Check Render logs: Click your service → "Logs" tab
- Make sure all files are on GitHub
- Check that Root Directory is set correctly

### "Can't Connect to Backend"
- Make sure `VITE_API_URL` has the correct backend URL
- Backend URL should end with `/api`
- Wait a few minutes - free tier can be slow to start

### "Service is Sleeping"
- Free tier services "sleep" after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds (it's waking up!)
- This is normal for free tier

### "Port Error"
- Make sure backend `PORT` is set to `10000` (not 5000!)
- Render uses port 10000 for free tier

---

## 💡 Free Tier Limits

**Render Free Tier:**
- ✅ Completely free forever
- ✅ Services sleep after 15 min inactivity (wake up on first request)
- ✅ 750 hours/month free (enough for 24/7!)
- ✅ Perfect for testing and small apps

**Note:** First request after sleep takes 30-60 seconds. This is normal!

---

## ✅ Quick Checklist

- [ ] Render account created
- [ ] Backend deployed (Web Service)
- [ ] Backend has environment variables set
- [ ] Backend URL saved
- [ ] Frontend deployed (Static Site)
- [ ] Frontend has `VITE_API_URL` set correctly
- [ ] Frontend URL works
- [ ] Can register and login

**If all checked → YOU'RE LIVE FOR FREE! 🚀**

---

## 📝 Important Notes

1. **Backend URL:** Use port `10000` (not 5000) for Render
2. **Sleep Mode:** Free services sleep after 15 min - first request is slow
3. **Environment Variables:** Must be set correctly or app won't work
4. **Build Time:** First build takes 3-5 minutes, be patient!

---

**Your app is now live - 100% FREE! 🎉**


