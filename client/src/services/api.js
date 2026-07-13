import axios from "axios";

// Use environment variable or default to empty (production)
const API_URL = import.meta.env.VITE_API_URL || "";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

// Add request interceptor to handle errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// Dashboard endpoints
export const getDashboard = () => apiClient.get("/api/dashboard");
export const getMetrics = () => apiClient.get("/api/status");

// Products endpoint
export const getProducts = () => apiClient.get("/api/products");

// Orders endpoint
export const getOrders = () => apiClient.get("/api/orders");

// Revenue endpoint
export const getRevenue = () => apiClient.get("/api/revenue");

// Customers endpoint
export const getCustomers = () => apiClient.get("/api/customers");

// Analytics endpoint
export const getAnalytics = () => apiClient.get("/api/analytics");

// Health check
export const getHealth = () => apiClient.get("/api/hello");

export default apiClient;
