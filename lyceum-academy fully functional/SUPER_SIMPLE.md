# 🎈 How to Put Your App on the Internet - SUPER SIMPLE!

**Think of this like putting your drawing on the wall so everyone can see it!**

---

## 🎯 What We're Doing

You made a cool app on your computer. Now we're going to put it on the internet so anyone can use it - FOR FREE!

It's like:
- Your computer = Your room (only you can see it)
- The internet = A big wall where everyone can see it

---

## 📦 STEP 1: Sign Up for Render (Like Getting a Free Room)

**What is Render?** It's like a free hotel for your app!

### Do This:

1. **Open your web browser** (Chrome, Safari, Firefox - any one!)

2. **Type this in the address bar:**
   ```
   render.com
   ```
   (Then press Enter)

3. **You'll see a page with a button that says:**
   ```
   Get Started for Free
   ```
   **Click that button!**

4. **You'll see options to sign up. Look for:**
   ```
   Continue with GitHub
   ```
   **Click that!**

5. **It will ask you to log in to GitHub** (you already have this!)
   - Enter your GitHub username and password
   - Click "Sign in"

6. **It will ask: "Authorize Render?"**
   - Click **"Authorize"** or **"Accept"**
   - This lets Render see your code (it's safe!)

7. **✅ DONE!** You now have a Render account!

**You're done with Step 1! Take a break if you want! 😊**

---

## 🏗️ STEP 2: Put Your Backend Online (The Brain)

**What is backend?** It's like the brain of your app - it remembers everything!

### Do This:

1. **In Render, look for a button that says:**
   ```
   New +
   ```
   (It's usually in the top right corner)
   **Click it!**

2. **A menu will pop up. Click:**
   ```
   Web Service
   ```
   (It might say "New Web Service")

3. **It will ask: "Connect a repository"**
   - You'll see a list of your GitHub projects
   - **Find and click on:** `lyceum-academy`
   - Click **"Connect"**

4. **Now you'll see a form. Fill it like this:**

   **Name:**
   - Type: `lyceum-backend`
   - (This is just a name, like naming your pet)

   **Root Directory:**
   - Type: `server`
   - (This tells Render where your backend code is)

   **Environment:**
   - Click the dropdown
   - Select: `Node`
   - (This tells Render what language your code uses)

   **Build Command:**
   - Type: `npm install`
   - (This tells Render to install your code's tools)

   **Start Command:**
   - Type: `npm start`
   - (This tells Render to start your app)

   **Plan:**
   - Make sure it says: **"Free"**
   - (This means it's free!)

5. **Scroll down. You'll see:**
   ```
   Environment Variables
   ```
   **Click "Add Environment Variable"** and add these 3 things:

   **First Variable:**
   - Key: Type `JWT_SECRET`
   - Value: Type `my-secret-key-12345`
   - Click "Add"

   **Second Variable:**
   - Click "Add Environment Variable" again
   - Key: Type `PORT`
   - Value: Type `10000`
   - Click "Add"

   **Third Variable:**
   - Click "Add Environment Variable" again
   - Key: Type `NODE_ENV`
   - Value: Type `production`
   - Click "Add"

6. **Scroll all the way to the bottom**

7. **Click the big button that says:**
   ```
   Create Web Service
   ```

8. **Now wait!** (Like waiting for popcorn to pop!)
   - You'll see it "Building..."
   - This takes 3-5 minutes
   - Go get a drink! 🥤

9. **When it's done, you'll see:**
   ```
   Live
   ```
   (This means it's working!)

10. **At the top of the page, you'll see a URL like:**
    ```
    https://lyceum-backend.onrender.com
    ```
    **COPY THIS URL!** (Right-click and "Copy" or Ctrl+C)
    
    **WRITE IT DOWN SOMEWHERE!** You'll need it!

11. **Add `/api` to the end:**
    ```
    https://lyceum-backend.onrender.com/api
    ```
    **This is your backend URL! Save it!**

**✅ DONE! Your backend is now on the internet!**

---

## 🎨 STEP 3: Put Your Frontend Online (The Face)

**What is frontend?** It's like the face of your app - what people see!

### Do This:

1. **In Render, click "New +" again** (top right)

2. **This time, click:**
   ```
   Static Site
   ```
   (NOT "Web Service" - that's different!)

3. **It will ask: "Connect a repository"**
   - Click on: `lyceum-academy` again
   - Click **"Connect"**

4. **Fill in the form:**

   **Name:**
   - Type: `lyceum-frontend`

   **Root Directory:**
   - Type: `.` (just a dot!)
   - OR leave it empty

   **Build Command:**
   - Type: `npm install && npm run build`
   - (This builds your frontend)

   **Publish Directory:**
   - Type: `dist`
   - (This is where the built files are)

   **Plan:**
   - Make sure it says: **"Free"**

5. **Scroll down to "Environment Variables"**

6. **Click "Add Environment Variable"**

7. **Add this:**
   - Key: Type `VITE_API_URL`
   - Value: Type the backend URL you saved!
     ```
     https://lyceum-backend.onrender.com/api
     ```
     (Use YOUR backend URL from Step 2!)
   - Click "Add"

8. **Scroll to the bottom**

9. **Click:**
   ```
   Create Static Site
   ```

10. **Wait again!** (3-5 minutes)
    - You'll see "Building..."
    - Be patient! 😊

11. **When it says "Live", look at the top**

12. **You'll see a URL like:**
    ```
    https://lyceum-frontend.onrender.com
    ```
    **THIS IS YOUR LIVE APP!** 🎉
    
    **COPY THIS URL!**

13. **Open this URL in a new browser tab**
    - Just copy and paste it in the address bar
    - Press Enter

14. **You should see your login page!** 🎉

**✅ DONE! Your app is LIVE on the internet!**

---

## 🧪 STEP 4: Test It (Make Sure It Works)

### Do This:

1. **You should see your login page**

2. **Click the "Register" button** (or "Sign Up")

3. **Fill in the form:**
   - Name: Type your name
   - Email: Type your email
   - Password: Type a password
   - Click "Register"

4. **If it works, you'll be logged in!** ✅

5. **Try logging out and logging back in**

6. **If everything works → YOU DID IT!** 🎉🎉🎉

---

## 🎉 CONGRATULATIONS!

**Your app is now on the internet - FOR FREE!**

You can share your frontend URL with anyone and they can use your app!

---

## 🆘 If Something Goes Wrong

### "I can't find the button"
- Look at the top right corner of Render
- The button says "New +" or has a plus sign (+)

### "It says 'Build Failed'"
- Click on your service
- Click "Logs" tab
- Read the error (it will tell you what's wrong)
- Common fix: Check that Root Directory is correct

### "I can't connect"
- Make sure you copied the backend URL correctly
- Make sure it ends with `/api`
- Make sure backend says "Live" (not "Building")

### "It's taking too long"
- First build takes 3-5 minutes - this is normal!
- Be patient! 😊
- Go get a snack! 🍪

### "The page won't load"
- Free services "sleep" after 15 minutes
- First request takes 30-60 seconds (it's waking up!)
- Just wait a bit and try again

---

## ✅ Checklist (Check Each One!)

- [ ] I signed up for Render
- [ ] I created a Web Service (backend)
- [ ] I added all 3 environment variables
- [ ] Backend says "Live"
- [ ] I saved the backend URL
- [ ] I created a Static Site (frontend)
- [ ] I added the VITE_API_URL variable
- [ ] Frontend says "Live"
- [ ] I can open the frontend URL
- [ ] I can register a new account
- [ ] I can login

**If you checked all of these → YOU'RE DONE! 🎉**

---

## 💡 Remember

1. **Backend = Web Service** (the brain)
2. **Frontend = Static Site** (the face)
3. **Use port 10000** (not 5000!)
4. **Be patient** - first build takes time
5. **Free services sleep** - first request is slow (that's normal!)

---

## 🎓 What You Just Did

You learned to:
- Put code on the internet
- Make it so anyone can use it
- Do it all for FREE!

**You're awesome! 🎉**

---

**That's it! Follow these steps one by one, and you'll have your app live!**

**Take your time. There's no rush! 😊**


