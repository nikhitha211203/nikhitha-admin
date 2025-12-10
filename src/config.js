
// This file handles the API URL configuration
// For local development, it can be empty (using proxy)
// For production, it should point to your Render backend

const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://portfolio-server-7kpi.onrender.com' // REPLACE THIS WITH YOUR ACTUAL RENDER URL
    : '';

export default API_URL;
