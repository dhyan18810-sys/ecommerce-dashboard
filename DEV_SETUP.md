# Development Setup

## Quick Start

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Run Development Server
```bash
npm run dev
```

This single command will:
- ✅ Start Vite dev server (React frontend)
- ✅ Start Vercel serverless functions locally (API endpoints)
- ✅ Everything runs on `http://localhost:3000`

### 3. Access the App
- Frontend: `http://localhost:3000`
- API endpoints: `http://localhost:3000/api/*`

## Environment Variables

Make sure `client/.env` has your Snowflake credentials:
```
SNOWFLAKE_ACCOUNT=your_account
SNOWFLAKE_USERNAME=your_username
SNOWFLAKE_PASSWORD=your_password
SNOWFLAKE_WAREHOUSE=COMPUTE_WH
SNOWFLAKE_DATABASE=ECOMMERCE_AI_DB
SNOWFLAKE_SCHEMA=RAW_DATA
SNOWFLAKE_ROLE=ACCOUNTADMIN
```

## How It Works

- `npm run dev` → Runs `vercel dev`
- Vercel CLI serves:
  - React app from `/client` (via Vite)
  - API functions from `/client/api` (as serverless functions)
- Same environment as production!

## Production Build

```bash
npm run build
```

Builds the client app for production deployment.
