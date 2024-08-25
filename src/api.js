import axios from 'axios';

// Set up default configurations for axios
const api = axios.create({
    baseURL: '/api', // The proxy setting in package.json will prepend the backend URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Login User
export const loginUser = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Example for fetching protected data
export const fetchProtectedData = async () => {
    try {
        const response = await api.get('/admin/admin');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:5000/api',
// });

// export default api;
