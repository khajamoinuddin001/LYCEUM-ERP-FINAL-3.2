# 🆓 START HERE - FREE Deployment Checklist

**100% FREE using Render.com - No credit card needed!**

---

## 📝 BEFORE YOU START

- [ ] Code is on GitHub ✅ (You already did this!)
- [ ] You have a web browser
- [ ] Ready to spend 30 minutes

---

## STEP 1: Sign Up for Render ⏱️ 2 minutes

- [ ] Go to https://render.com
- [ ] Click "Get Started for Free"
- [ ] Sign up with GitHub
- [ ] Allow Render to access GitHub
- [ ] ✅ Account created!

---

## STEP 2: Deploy Backend ⏱️ 10 minutes

- [ ] Click "New +" → "Web Service"
- [ ] Connect your GitHub repository
- [ ] Select `lyceum-academy` repository
- [ ] Fill in settings:
  - Name: `lyceum-backend`
  - Root Directory: `server`
  - Environment: `Node`
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Plan: **Free**
- [ ] Add Environment Variables:
  - `JWT_SECRET` = `my-secret-key-12345`
  - `PORT` = `10000` (important: use 10000, not 5000!)
  - `NODE_ENV` = `production`
- [ ] Click "Create Web Service"
- [ ] Wait 3-5 minutes for deployment
- [ ] Copy the URL (looks like: `https://lyceum-backend.onrender.com`)
- [ ] Add `/api` to the end: `https://lyceum-backend.onrender.com/api`
- [ ] **SAVE THIS URL!** You'll need it next!
- [ ] ✅ Backend is live!

---

## STEP 3: Deploy Frontend ⏱️ 10 minutes

- [ ] Click "New +" → "Static Site" (not Web Service!)
- [ ] Connect your GitHub repository
- [ ] Select `lyceum-academy` repository
- [ ] Fill in settings:
  - Name: `lyceum-frontend`
  - Root Directory: `.` (just a dot, or leave empty)
  - Build Command: `npm install && npm run build`
  - Publish Directory: `dist`
  - Plan: **Free**
- [ ] Add Environment Variable:
  - `VITE_API_URL` = `https://YOUR-BACKEND-URL.onrender.com/api`
  (Use the URL from Step 2!)
- [ ] Click "Create Static Site"
- [ ] Wait 3-5 minutes for deployment
- [ ] Copy the URL (looks like: `https://lyceum-frontend.onrender.com`)
- [ ] **THIS IS YOUR LIVE APP URL!** 🎉
- [ ] ✅ Frontend is live!

---

## STEP 4: Test It ⏱️ 2 minutes

- [ ] Open your frontend URL in browser
- [ ] You should see login page
- [ ] Try "Register" button
- [ ] Create a test account
- [ ] Try logging in
- [ ] If it works → **YOU'RE DONE!** 🎉

---

## 🎉 SUCCESS!

**Your app is now live - 100% FREE!**

Share your frontend URL with anyone!

---

## 🆘 IF SOMETHING GOES WRONG

### "Build Failed"
- Click your service → "Logs" tab
- Read the error message
- Check that Root Directory is correct

### "Can't Connect"
- Make sure `VITE_API_URL` has correct backend URL
- Backend URL should end with `/api`
- Check that backend is "Live" (not "Building")

### "Service Sleeping"
- Free services sleep after 15 min of no use
- First request takes 30-60 seconds (it's waking up!)
- This is normal - just wait!

### "Port Error"
- Make sure `PORT` is set to `10000` (not 5000!)
- Render uses port 10000

---

## 💡 Important Notes

1. **First request is slow** - Free services sleep, takes 30-60 sec to wake up
2. **Use port 10000** - Not 5000! Render requires 10000
3. **Be patient** - First build takes 3-5 minutes
4. **Check logs** - If something breaks, check the "Logs" tab

---

## ✅ FINAL CHECKLIST

- [ ] Backend deployed and "Live"
- [ ] Backend URL saved (with `/api` at end)
- [ ] Frontend deployed and "Live"
- [ ] `VITE_API_URL` set correctly
- [ ] Frontend URL opens in browser
- [ ] Can register new account
- [ ] Can login

**If all checked → YOU DID IT FOR FREE! 🚀🎉**

---

## 📚 Need More Details?

Read `GO_LIVE_FREE.md` for detailed instructions with screenshots guidance.

---

**Time to celebrate! Your app is live and FREE! 🎉🎉🎉**


