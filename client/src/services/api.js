import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
export const getDashboard = () => apiClient.get("/dashboard");
export const getMetrics = () => apiClient.get("/admin/status");

// Products endpoint
export const getProducts = () => apiClient.get("/products");

// Orders endpoint
export const getOrders = () => apiClient.get("/orders");

// Revenue endpoint
export const getRevenue = () => apiClient.get("/revenue");

// Customers endpoint
export const getCustomers = () => apiClient.get("/customers");

// Analytics endpoint
export const getAnalytics = () => apiClient.get("/analytics");

// Health check
export const getHealth = () => apiClient.get("/api/hello").catch(() => apiClient.get("/health"));

export default apiClient;
