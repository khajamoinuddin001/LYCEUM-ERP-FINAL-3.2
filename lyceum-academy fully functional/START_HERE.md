# 🎯 START HERE - Going Live Checklist

**⚠️ UPDATE: This guide uses Railway (which may charge). For 100% FREE deployment, use `START_HERE_FREE.md` instead!**

**Follow this checklist step by step. Check each box as you complete it!**

---

## 📝 BEFORE YOU START

- [ ] You have a computer with internet
- [ ] You have a web browser (Chrome, Firefox, Safari)
- [ ] You're ready to spend 30 minutes

---

## STEP 1: Put Code on GitHub ⏱️ 5 minutes

- [ ] Go to https://github.com and sign up (free)
- [ ] Click "+" button → "New repository"
- [ ] Name it: `lyceum-academy`
- [ ] Click "Create repository"
- [ ] Download GitHub Desktop: https://desktop.github.com
- [ ] Install GitHub Desktop
- [ ] Open GitHub Desktop
- [ ] Click "File" → "Add Local Repository"
- [ ] Select your project folder
- [ ] Click "Publish repository"
- [ ] ✅ Code is now on GitHub!

---

## STEP 2: Deploy Backend ⏱️ 10 minutes

- [ ] Go to https://railway.app
- [ ] Sign up with GitHub
- [ ] Click "New Project"
- [ ] Click "Deploy from GitHub repo"
- [ ] Select your repository
- [ ] Click "Add Service" → "Empty Service"
- [ ] Click on the service
- [ ] Go to "Settings" → Set "Root Directory" to: `server`
- [ ] Go to "Variables" tab
- [ ] Add variable: `JWT_SECRET` = `my-secret-key-12345`
- [ ] Add variable: `PORT` = `5000`
- [ ] Add variable: `NODE_ENV` = `production`
- [ ] Go to "Deploy" tab → Click "Deploy"
- [ ] Wait 2 minutes
- [ ] Click "Generate Domain"
- [ ] **COPY THE URL** (save it somewhere!)
- [ ] ✅ Backend is live!

**Your backend URL looks like:** `https://something.railway.app`

---

## STEP 3: Deploy Frontend ⏱️ 10 minutes

- [ ] In Railway, click "New" → "Empty Service"
- [ ] Click on the new service
- [ ] Go to "Settings" tab
- [ ] Set "Root Directory" to: `.` (just a dot)
- [ ] Set "Build Command" to: `npm install && npm run build`
- [ ] Set "Start Command" to: `npm run preview`
- [ ] Go to "Variables" tab
- [ ] Add variable: `VITE_API_URL` = `https://YOUR-BACKEND-URL.railway.app/api`
  (Replace YOUR-BACKEND-URL with the URL from Step 2!)
- [ ] Go to "Deploy" tab → Click "Deploy"
- [ ] Wait 2 minutes
- [ ] Click "Generate Domain"
- [ ] **COPY THIS URL** - THIS IS YOUR LIVE APP!
- [ ] ✅ Frontend is live!

**Your frontend URL looks like:** `https://something-else.railway.app`

---

## STEP 4: Test It ⏱️ 2 minutes

- [ ] Open your frontend URL in a browser
- [ ] You should see your login page
- [ ] Try clicking "Register"
- [ ] Create a test account
- [ ] Try logging in
- [ ] If it works → **YOU'RE DONE!** 🎉

---

## 🎉 SUCCESS!

**Your app is now live on the internet!**

Share your frontend URL with anyone you want to use your app!

---

## 🆘 IF SOMETHING GOES WRONG

1. **Check Railway logs:**
   - Click on your service
   - Click "Deployments"
   - Click the latest one
   - Click "View Logs"
   - Read the error message

2. **Common fixes:**
   - "Build failed" → Check that all files are on GitHub
   - "Can't connect" → Make sure `VITE_API_URL` has the correct backend URL
   - "404 error" → Make sure both services are deployed

3. **Still stuck?**
   - Read the error in Railway logs
   - Google the error message
   - Check that all environment variables are set

---

## 📚 Need More Help?

- **Simple guide:** Read `GO_LIVE_SIMPLE.md`
- **Detailed guide:** Read `GO_LIVE_VIDEO.md`
- **Full docs:** Read `DEPLOYMENT.md`

---

## ✅ FINAL CHECKLIST

Before you celebrate:

- [ ] Backend is deployed and has a URL
- [ ] Frontend is deployed and has a URL
- [ ] `VITE_API_URL` is set correctly
- [ ] You can open the frontend URL
- [ ] You can register a new account
- [ ] You can login

**If all checked → YOU DID IT! 🚀**

---

**Time to celebrate! Your app is live! 🎉🎉🎉**

