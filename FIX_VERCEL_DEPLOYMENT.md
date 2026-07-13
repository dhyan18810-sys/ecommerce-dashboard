# Fix Vercel Deployment - Step by Step

## Current Problem
The frontend is calling `ecommerce-dashboard-dhyan7.vercel.app` instead of using the same domain APIs.

## Root Cause
The built code has a cached environment variable. We need to force a clean rebuild.

---

## ✅ Solution Steps

### Step 1: Delete Old Environment Variable in Vercel
1. Go to: https://vercel.com/
2. Select project: **snowflake-react-project**
3. Go to: **Settings → Environment Variables**
4. **Look for `VITE_API_URL`** - if it exists, click the **three dots** → **Remove**
5. Click **Save**

### Step 2: Verify Root Directory
1. Still in Settings → **General → Root Directory**
2. Should be set to: `client`
3. If not, set it and **Save**

### Step 3: Force Complete Rebuild
1. Go to: **Deployments** tab
2. Find the **latest deployment**
3. Click the **three dots (⋮)** on the right
4. Click **"Redeploy"**
5. ⚠️ **IMPORTANT**: Check the box **"Use existing Build Cache"** and **UNCHECK** it
6. Click **"Redeploy"**

This forces a fresh build without any cached environment variables.

### Step 4: Wait for Deployment
- Wait for deployment to complete (usually 2-3 minutes)
- Check the build logs for any errors
- Look for: "Build Completed" with green checkmark

### Step 5: Clear Browser Cache
After successful deployment:
- **Hard Refresh**: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- **Or**: Open site in **Incognito/Private Window**

### Step 6: Test API
Open browser console (F12) and check:
- Should see requests to: `https://snowflake-react-project.vercel.app/api/*`
- Should NOT see: `https://ecommerce-dashboard-dhyan7.vercel.app/*`

---

## 🔍 Verification Checklist

After deployment, test these URLs:

### ✅ Frontend
```
https://snowflake-react-project.vercel.app/
```
Should show: Dashboard with metrics

### ✅ API Dashboard
```
https://snowflake-react-project.vercel.app/api/dashboard
```
Should return JSON:
```json
{
  "TOTAL_ORDERS": 1234,
  "TOTAL_REVENUE": 567890,
  "TOTAL_CUSTOMERS": 456,
  "TOTAL_PRODUCTS_SOLD": 7890
}
```

### ✅ API Hello
```
https://snowflake-react-project.vercel.app/api/hello
```
Should return API info JSON

---

## 🚨 If Still Not Working

### Option A: Delete .vercel folder and redeploy
1. In your project root, delete `.vercel` folder (if it exists)
2. Run: `git add -A && git commit -m "Force fresh deploy" && git push`
3. This triggers a new deployment

### Option B: Create New Deployment from Vercel Dashboard
1. Go to Vercel project
2. Go to **Deployments** tab
3. Click **"Visit"** on a working deployment
4. Or click **"Deploy"** button to trigger manual deploy

### Option C: Check Build Logs
1. Go to **Deployments** → Click on latest deployment
2. Click **"Building"** or **"Build Logs"**
3. Look for:
   - `VITE_API_URL` mentions (should be NONE)
   - Any build errors
   - "Build Completed" message

---

## 📋 Expected Environment Variables in Vercel

You should see ONLY these 7 variables:
```
SNOWFLAKE_ACCOUNT
SNOWFLAKE_USERNAME  
SNOWFLAKE_PASSWORD
SNOWFLAKE_WAREHOUSE
SNOWFLAKE_DATABASE
SNOWFLAKE_SCHEMA
SNOWFLAKE_ROLE
```

**NO VITE_API_URL should exist!**

---

## 💡 Why This Happens

1. Previously, `VITE_API_URL` was set to point to `ecommerce-dashboard-dhyan7`
2. Vite bakes environment variables into the build at build time
3. Even after removing the variable, the old build is cached
4. Solution: Force rebuild without cache

---

## ✨ After Fix

- ✅ Frontend and API on same domain (no CORS)
- ✅ All data loads from Snowflake
- ✅ No network errors
- ✅ Dashboard shows real metrics
