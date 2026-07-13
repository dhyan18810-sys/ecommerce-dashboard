# E-commerce Dashboard with Snowflake

Full-stack e-commerce analytics dashboard with React frontend and Express backend connected to Snowflake database.

## 🚀 Quick Start

### 1. Install All Dependencies
```bash
npm run install:all
```

### 2. Run Development (Both Server & Client)
```bash
npm run dev
```

This will start:
- **Backend API**: `http://localhost:5000`
- **Frontend React**: `http://localhost:5173`

## 📁 Project Structure

```
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service
│   │   └── App.jsx
│   ├── api/                # Vercel serverless functions (for production)
│   └── .env.local          # Frontend env variables
│
├── server/                  # Express backend
│   ├── server.js           # Main server file
│   ├── db.js               # Snowflake connection
│   └── .env                # Backend env variables (Snowflake credentials)
│
└── package.json            # Root scripts
```

## 🔧 Environment Variables

### Server (.env)
Create `server/.env` with your Snowflake credentials:
```env
SNOWFLAKE_ACCOUNT=your_account
SNOWFLAKE_USERNAME=your_username
SNOWFLAKE_PASSWORD=your_password
SNOWFLAKE_WAREHOUSE=COMPUTE_WH
SNOWFLAKE_DATABASE=ECOMMERCE_AI_DB
SNOWFLAKE_SCHEMA=RAW_DATA
SNOWFLAKE_ROLE=ACCOUNTADMIN
PORT=5000
```

### Client (.env.local)
`client/.env.local` points to local server:
```env
VITE_API_URL=http://localhost:5000
```

## 🌐 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/dashboard` | Overall statistics |
| `GET /api/products` | Product list |
| `GET /api/orders` | Order list |
| `GET /api/revenue` | Daily revenue data |
| `GET /api/customers` | Customer list with stats |
| `GET /api/analytics` | Top selling products |

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run both server and client |
| `npm run dev:server` | Run only Express server |
| `npm run dev:client` | Run only React client |
| `npm run build` | Build for production |
| `npm run install:all` | Install all dependencies |

## 🚢 Production Deployment (Vercel)

The app is deployed on Vercel with:
- **Frontend + Serverless API**: Combined deployment
- **Root Directory**: `client`
- **API Functions**: `client/api` (mirrors server endpoints)

### Deploy to Vercel:
1. Push to GitHub
2. Vercel auto-deploys from `client` folder
3. API runs as serverless functions from `client/api`
4. Add Snowflake env variables in Vercel dashboard

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Recharts, Axios
- **Backend**: Express, Snowflake SDK
- **Database**: Snowflake
- **Deployment**: Vercel (Frontend + Serverless Functions)

## 📊 Features

- ✅ Real-time dashboard with metrics
- ✅ Product management
- ✅ Order tracking
- ✅ Customer analytics
- ✅ Revenue charts
- ✅ Top selling products

## 🔒 Security Notes

- Never commit `.env` files
- Snowflake credentials are in `.env` (git-ignored)
- Production uses Vercel environment variables

## 📝 Development Workflow

1. **Local Development**:
   - Server runs on port 5000 (Express)
   - Client runs on port 5173 (Vite)
   - Both run together with `npm run dev`

2. **Production**:
   - Client deployed to Vercel
   - API runs as serverless functions
   - Same codebase, different execution

---

Made with ❤️ using React, Express, and Snowflake
