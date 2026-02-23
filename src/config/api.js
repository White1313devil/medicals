// API Configuration - Centralized URL management
// For development: use http://localhost:5000
// For production: use relative paths (same domain as frontend)
const getApiBaseUrl = () => {
    // Check for environment variable first
    if (import.meta.env.VITE_API_BASE_URL) {
        return import.meta.env.VITE_API_BASE_URL;
    }
    
    // In development, use localhost
    if (import.meta.env.DEV) {
        return 'http://localhost:5000';
    }
    
    // In production, use relative path (same origin)
    return '';
};

const API_BASE_URL = getApiBaseUrl();
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1234567890';

// API Endpoints
export const API_ENDPOINTS = {
    // Auth
    AUTH_LOGIN: `${API_BASE_URL}/api/auth/login`,

    // Products
    PRODUCTS: `${API_BASE_URL}/api/products`,
    PRODUCT_CREATE: `${API_BASE_URL}/api/products`,
    PRODUCT_UPDATE: (id) => `${API_BASE_URL}/api/products/${id}`,
    PRODUCT_DELETE: (id) => `${API_BASE_URL}/api/products/${id}`,

    // Categories
    CATEGORIES: `${API_BASE_URL}/api/categories`,
    CATEGORY_CREATE: `${API_BASE_URL}/api/categories`,
    CATEGORY_UPDATE: (id) => `${API_BASE_URL}/api/categories/${id}`,
    CATEGORY_DELETE: (id) => `${API_BASE_URL}/api/categories/${id}`,

    // Orders
    ORDERS: `${API_BASE_URL}/api/orders`,
    ORDER_CREATE: `${API_BASE_URL}/api/orders`,
    ORDER_UPDATE: (id) => `${API_BASE_URL}/api/orders/${id}`,

    // Customers
    CUSTOMERS: `${API_BASE_URL}/api/customers`,
    CUSTOMER_CREATE: `${API_BASE_URL}/api/customers`,

    // Dashboard
    DASHBOARD: `${API_BASE_URL}/api/dashboard`,

    // Suppliers
    SUPPLIERS: `${API_BASE_URL}/api/suppliers`,
};

export const CONFIG = {
    API_BASE_URL,
    RAZORPAY_KEY,
};

export default { API_ENDPOINTS, CONFIG };
