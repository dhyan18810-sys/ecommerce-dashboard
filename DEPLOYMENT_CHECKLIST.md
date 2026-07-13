# Vercel Deployment Checklist

## ⚠️ Current Status
- ❌ **ecommerce-dashboard-dhyan7.vercel.app** - Wrong config (showing API message)
- ⚠️ **snowflake-react-project.vercel.app** - Correct but API not working (500 errors)

## ✅ Fix Steps for snowflake-react-project

### 1. Set Root Directory
Go to: **Settings → General → Root Directory**
- Set to: `client`
- Save changes

### 2. Add Environment Variables
Go to: **Settings → Environment Variables**

Add these for **Production, Preview, and Development**:

```
SNOWFLAKE_ACCOUNT=STPVIQA-PB85525
SNOWFLAKE_USERNAME=DHYAN1
SNOWFLAKE_PASSWORD=Dhyan@8373738383
SNOWFLAKE_WAREHOUSE=COMPUTE_WH
SNOWFLAKE_DATABASE=ECOMMERCE_AI_DB
SNOWFLAKE_SCHEMA=RAW_DATA
SNOWFLAKE_ROLE=ACCOUNTADMIN
```

### 3. Verify vercel.json
Make sure `vercel.json` has:
```json
{
  "buildCommand": "cd client && npm install && npm run build",
  "devCommand": "cd client && npm run dev",
  "installCommand": "cd client && npm install",
  "outputDirectory": "client/dist",
  "framework": null,
  "rewrites": [
    {
      "source": "/((?!api).*)",
      "destination": "/index.html"
    }
  ]
}
```

### 4. Redeploy
- Go to: **Deployments**
- Click on latest deployment
- Click "Redeploy"

### 5. Test Endpoints
After deployment, test:
- Frontend: https://snowflake-react-project.vercel.app/
- API: https://snowflake-react-project.vercel.app/api/dashboard
- Should return JSON data with TOTAL_ORDERS, TOTAL_REVENUE, etc.

## 🗑️ Optional: Delete Old Deployment
You can delete **ecommerce-dashboard-dhyan7** project since it's not needed anymore.

## 📊 Expected Result
After following these steps:
- ✅ React app loads at root
- ✅ All dashboard metrics show real data
- ✅ API endpoints return Snowflake data
- ✅ No CORS errors
- ✅ Everything on one domain

## 🔍 Debugging
If API still returns 500:
1. Check Vercel deployment logs
2. Look for Snowflake connection errors
3. Verify environment variables are set correctly
4. Check that `client/api/package.json` has snowflake-sdk dependency
