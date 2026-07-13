# Vercel Deployment Setup Instructions

## Changes Made:
1. ✅ Copied `/api` folder into `/client/api`
2. ✅ Created `client/api/db.js` for Snowflake connection
3. ✅ Updated all API imports to use `./db` instead of `../server/db`
4. ✅ Created `client/api/package.json` with snowflake-sdk dependency
5. ✅ Updated `client/src/services/api.js` to use `/api/*` paths

## Vercel Project Settings (snowflake-react-project):

### 1. Root Directory
- Go to: Settings → General → Root Directory
- Set to: `client`
- ✅ Save

### 2. Environment Variables
- Go to: Settings → Environment Variables
- Add the following variables (for Production, Preview, and Development):

```
SNOWFLAKE_ACCOUNT=STPVIQA-PB85525
SNOWFLAKE_USERNAME=DHYAN1
SNOWFLAKE_PASSWORD=Dhyan@8373738383
SNOWFLAKE_WAREHOUSE=COMPUTE_WH
SNOWFLAKE_DATABASE=ECOMMERCE_AI_DB
SNOWFLAKE_SCHEMA=RAW_DATA
SNOWFLAKE_ROLE=ACCOUNTADMIN
```

### 3. Deploy
- Commit and push all changes
- Vercel will automatically deploy
- Your app will be available at: https://snowflake-react-project.vercel.app/

## What This Setup Does:
- Frontend (React + Vite) serves from `/client/dist`
- API functions run as Vercel Serverless Functions from `/client/api`
- All endpoints are on the same domain: `https://snowflake-react-project.vercel.app/api/*`
- No CORS issues since frontend and API are on the same domain
- Snowflake connection is created fresh for each API request (best practice for serverless)

## Endpoints:
- Dashboard: `/api/dashboard`
- Products: `/api/products`
- Orders: `/api/orders`
- Revenue: `/api/revenue`
- Hello: `/api/hello`

## Note:
The old deployment at `ecommerce-dashboard-git-main-dhyan7.vercel.app` can be deleted or kept as backup.
