// src/Pages/Auth/Login/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5000/api";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // Clear submit errors when user makes any change
        if (errors.submit) {
            setErrors(prev => ({
                ...prev,
                submit: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email: formData.email.toLowerCase().trim(),
                password: formData.password
            }, { withCredentials: true }); // <--- CRITICAL FIX

            // Store token and user data
            const { token, user, permissions } = response.data;

            // Merge permissions into user object for easier access
            const userWithPermissions = { ...user, permissions: permissions || [] };

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userWithPermissions));
            console.log("Login success. Permissions saved:", permissions);

            // Redirect to dashboard
            window.location.href = '/dashboard';

        } catch (error) {
            console.error('Login Error:', error);

            let errorMessage = 'Login failed. Please try again.';

            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Invalid email or password.';
                } else if (error.response.status === 404) {
                    errorMessage = 'User not found.';
                } else if (error.response.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                } else if (error.response.data?.error) {
                    errorMessage = error.response.data.error;
                }
            } else if (error.request) {
                errorMessage = 'Network error. Please check your connection.';
            }

            setErrors({ submit: errorMessage });

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600">
                        Sign in to your account to continue
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Submit Error Message */}
                    {errors.submit && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-800 text-sm font-medium">{errors.submit}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${errors.email
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300'
                                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="Enter your email address"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <span className="mr-1">⚠</span>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password *
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isLoading}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${errors.password
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300'
                                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="Enter your password"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <span className="mr-1">⚠</span>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    disabled={isLoading}
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a
                                    href="/forgot-password"
                                    className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                    Signing In...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <span className="mr-2">🔑</span>
                                    Sign In
                                </div>
                            )}
                        </button>
                    </form>

                    {/* Signup Redirect */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <a
                                href="/signup"
                                className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 underline"
                            >
                                Create one here
                            </a>
                        </p>
                    </div>
                </div>

                {/* Demo Credentials */}
                <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
                        <span className="mr-2">💡</span>
                        Demo Credentials:
                    </h3>
                    <div className="text-xs text-blue-700 space-y-1">
                        <p><span className="font-medium">Email:</span> demo@example.com</p>
                        <p><span className="font-medium">Password:</span> demo123</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
