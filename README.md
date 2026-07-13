# Ecommerce Dashboard

A modern e-commerce analytics dashboard built with **React + Vite** for the frontend and **Express.js + Snowflake** for the backend.

## 🚀 Features

- ✅ Real-time analytics dashboard
- ✅ Products catalog with search
- ✅ Orders management
- ✅ Revenue tracking
- ✅ Customer insights
- ✅ Admin UI with data viewer
- ✅ Responsive design
- ✅ Snowflake database integration

## 📋 Prerequisites

- Node.js 16+
- npm or yarn
- Snowflake account with configured database

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/dhyan18810-sys/ecommerce-dashboard.git
cd ecommerce-dashboard
```

### 2. Setup Environment Variables
Create a `.env` file in the server directory:

```bash
SNOWFLAKE_ACCOUNT=your_account
SNOWFLAKE_USERNAME=your_username
SNOWFLAKE_PASSWORD=your_password
SNOWFLAKE_WAREHOUSE=COMPUTE_WH
SNOWFLAKE_DATABASE=ECOMMERCE_AI_DB
SNOWFLAKE_SCHEMA=RAW_DATA
SNOWFLAKE_ROLE=ACCOUNTADMIN
```

### 3. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

## 🏃 Running Locally

### Development Server

**Start Backend (Port 5000):**
```bash
cd server
npm start
```

**Start Frontend (Port 5173):**
```bash
cd client
npm run dev
```

**Admin Dashboard:** http://localhost:5000/admin/dashboard

### API Endpoints (Local)

- `GET /` - API health check
- `GET /products` - Get all products
- `GET /orders` - Get all orders
- `GET /customers` - Get all customers
- `GET /revenue` - Get revenue data
- `GET /dashboard` - Get dashboard metrics
- `GET /admin/dashboard` - Admin dashboard UI
- `GET /admin/status` - Server status & metrics

## 🚀 Deployment to Vercel

### Prerequisites
- Vercel account
- GitHub repository (already setup)

### Steps

1. **Push to GitHub:**
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

2. **Connect to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "Add New Project"
   - Import from GitHub: `dhyan18810-sys/ecommerce-dashboard`
   - Select project settings

3. **Configure Environment Variables:**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add all variables from `.env`:
     - `SNOWFLAKE_ACCOUNT`
     - `SNOWFLAKE_USERNAME`
     - `SNOWFLAKE_PASSWORD`
     - `SNOWFLAKE_WAREHOUSE`
     - `SNOWFLAKE_DATABASE`
     - `SNOWFLAKE_SCHEMA`
     - `SNOWFLAKE_ROLE`

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete

### Deployed URL
```
https://ecommerce-dashboard-cyan-rho.vercel.app/
```

## 📁 Project Structure

```
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── assets/        # Images and icons
│   │   └── App.jsx        # Main app
│   └── package.json
│
├── server/                # Express Backend
│   ├── server.js         # Main server file
│   ├── db.js             # Snowflake connection
│   ├── dashboard.html    # Admin dashboard
│   └── package.json
│
├── api/                  # Vercel Serverless Functions
│   ├── products.js       # Products API
│   ├── orders.js         # Orders API
│   ├── revenue.js        # Revenue API
│   ├── dashboard.js      # Dashboard API
│   └── hello.js          # Health check
│
├── vercel.json          # Vercel configuration
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🗄️ Database Schema

### ORDERS4 Table
```sql
SELECT * FROM ECOMMERCE_AI_DB.RAW_DATA.ORDERS4
```

### PRODUCTS2 Table
```sql
SELECT * FROM ECOMMERCE_AI_DB.RAW_DATA.PRODUCTS2
```

### CUSTOMERS Table
```sql
SELECT * FROM ECOMMERCE_AI_DB.RAW_DATA.CUSTOMERS
```

## 🔧 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm start        # Start Express server
npm run dev      # Start with nodemon
```

## 📊 Features Explained

### Admin Dashboard
- **Server Status**: Real-time uptime and metrics
- **Database Connection**: Snowflake status
- **Data Viewer**: Browse products, orders, customers, revenue
- **Search**: Filter data in real-time
- **API Endpoints**: Complete API documentation

### Frontend Dashboard
- **Overview Cards**: Key metrics at a glance
- **Revenue Chart**: Daily revenue trends
- **Orders Table**: Recent orders with details
- **Analytics**: Product performance

## 🐛 Troubleshooting

### Snowflake Connection Issues
- Verify credentials in `.env`
- Check Snowflake account is active
- Ensure warehouse is running
- Verify network connectivity

### Vercel Deployment Issues
- Check environment variables are set correctly
- Review Vercel deployment logs
- Ensure build command completes successfully
- Verify API routes are accessible at `/api/*`

### CORS Issues
- All API routes include CORS headers
- Frontend configured to allow cross-origin requests

## 📝 Environment Variables Template

Create `.env` file in server directory:

```env
# Snowflake Configuration
SNOWFLAKE_ACCOUNT=xxxx-xxxxx
SNOWFLAKE_USERNAME=your_username
SNOWFLAKE_PASSWORD=your_password
SNOWFLAKE_WAREHOUSE=COMPUTE_WH
SNOWFLAKE_DATABASE=ECOMMERCE_AI_DB
SNOWFLAKE_SCHEMA=RAW_DATA
SNOWFLAKE_ROLE=ACCOUNTADMIN

# Optional
NODE_ENV=development
PORT=5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project

## 👨‍💼 Author

**Dhyan**
- GitHub: [@dhyan18810-sys](https://github.com/dhyan18810-sys)
- Repository: [ecommerce-dashboard](https://github.com/dhyan18810-sys/ecommerce-dashboard)

## 🙋 Support

For issues and questions:
1. Check the [GitHub Issues](https://github.com/dhyan18810-sys/ecommerce-dashboard/issues)
2. Create a new issue with details
3. Include error messages and screenshots

---

**Last Updated**: July 13, 2026
**Version**: 1.0.0
**Status**: ✅ Active & Maintained
