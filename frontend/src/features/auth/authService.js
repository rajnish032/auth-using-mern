import axiosInstance from '../../utils/axios';

const API_URL = '/api/auth/';

// Register user
const register = async (userData) => {
    const response = await axiosInstance.post(API_URL + 'register', userData);
    // Note: User is NOT logged in yet. They must verify email.
    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axiosInstance.post(API_URL + 'login', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Google Login
const googleLogin = async (credential) => {
    const response = await axiosInstance.post(API_URL + 'google', { credential });

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Verify Email
const verifyEmail = async (verifyData) => {
    const response = await axiosInstance.post(API_URL + 'verify-email', verifyData);

    if (response.data) {
        // Now the user is logged in
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Resend OTP
const resendOTP = async (emailData) => {
    const response = await axiosInstance.post(API_URL + 'resend-otp', emailData);
    return response.data;
};

// Logout user
const logout = async () => {
    await axiosInstance.post(API_URL + 'logout');
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    googleLogin,
    logout,
    verifyEmail,
    resendOTP,
};

export default authService;
