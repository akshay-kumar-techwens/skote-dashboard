// SignupPage.jsx
import React, { useState } from 'react';
import { UserRole } from './types';
import axios from 'axios';

// For Vite: use import.meta.env
const API_URL = "http://localhost:5000/api";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: UserRole.MANAGER
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [availableRoles, setAvailableRoles] = useState([
        { value: UserRole.MANAGER, label: 'Manager' },
        { value: UserRole.ACCOUNTANT, label: 'Accountant' },
        { value: UserRole.SUPER_ADMIN, label: 'Super Admin' }
    ]);

    // Fetch dynamic roles
    React.useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(`${API_URL}/roles/all`);
                // Backend returns { roles: [...] }
                const rolesData = response.data.roles || [];
                const dynamicRoles = rolesData.map(r => ({
                    value: r.roleName,
                    label: r.roleName.charAt(0).toUpperCase() + r.roleName.slice(1) // Capitalize
                }));

                setAvailableRoles(prev => {
                    // Avoid duplicates
                    const existingValues = new Set(prev.map(p => p.value));
                    const newRoles = dynamicRoles.filter(d => !existingValues.has(d.value));
                    return [...prev, ...newRoles];
                });
            } catch (error) {
                console.error("Failed to fetch roles", error);
            }
        };
        fetchRoles();
    }, []);

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

        // Clear success message when user makes changes
        if (successMessage) {
            setSuccessMessage('');
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one letter and one number';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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
        setSuccessMessage('');

        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                name: formData.name.trim(),
                email: formData.email.toLowerCase().trim(),
                password: formData.password,
                role: formData.role
            });

            setSuccessMessage('Account created successfully! Redirecting to login...');

            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);

        } catch (error) {
            console.error('Signup Error:', error);

            let errorMessage = 'Signup failed. Please try again.';

            if (error.response) {
                // Server responded with error status
                if (error.response.status === 409) {
                    errorMessage = 'Email already exists. Please use a different email.';
                } else if (error.response.status === 400) {
                    errorMessage = error.response.data.error || 'Invalid data provided.';
                } else if (error.response.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                } else if (error.response.data?.error) {
                    errorMessage = error.response.data.error;
                }
            } else if (error.request) {
                // Request was made but no response received
                errorMessage = 'Network error. Please check your connection.';
            }

            setErrors({ submit: errorMessage });

        } finally {
            setIsLoading(false);
        }
    };

    const roleDescriptions = {
        [UserRole.SUPER_ADMIN]: 'Full system access and administration privileges',
        [UserRole.ACCOUNTANT]: 'Financial management, reporting, and accounting functions',
        [UserRole.MANAGER]: 'Team management and operational oversight'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* ... Header ... */}

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* ... Messages ... */}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={isLoading}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.name
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300'
                                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="Enter your full name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <span className="mr-1">⚠</span>
                                    {errors.name}
                                </p>
                            )}
                        </div>

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
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.email
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

                        {/* Role Field */}
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                Role *
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                disabled={isLoading}
                                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {availableRoles.map(role => (
                                    <option key={role.value} value={role.value}>
                                        {role.label}
                                    </option>
                                ))}
                            </select>
                            <p className="mt-2 text-sm text-gray-500 bg-blue-50 p-2 rounded">
                                💼 {roleDescriptions[formData.role] || ('Custom Role: ' + formData.role)}
                            </p>
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
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.password
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300'
                                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="Create a strong password"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <span className="mr-1">⚠</span>
                                    {errors.password}
                                </p>
                            )}
                            {!errors.password && formData.password && (
                                <p className="mt-1 text-xs text-gray-500">
                                    🔒 Must be at least 6 characters with letters and numbers
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password *
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={isLoading}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.confirmPassword
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300'
                                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <span className="mr-1">⚠</span>
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <span className="mr-2">🚀</span>
                                    Create Account
                                </div>
                            )}
                        </button>
                    </form>

                    {/* Login Redirect */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <a
                                href="/login"
                                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 underline"
                            >
                                Sign in here
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-gray-500 text-sm">
                        By creating an account, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
