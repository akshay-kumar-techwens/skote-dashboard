import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Shield, User, Mail, Lock } from 'lucide-react';
import { MENU_ITEMS } from '../../../Components/constants';

// Helpers
const API_URL = 'http://localhost:5000/api';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        password: ''
    });
    // Store full role objects: { roleName, rolePermissions }
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    // Initial Load
    useEffect(() => {
        const loadData = async () => {
            try {
                // 1. Fetch User Data
                const userRes = await axios.get(`${API_URL}/auth/users/${id}`, { withCredentials: true });
                const userData = userRes.data;

                setFormData({
                    name: userData.name,
                    email: userData.email,
                    role: userData.role,
                    password: '' // Keep empty unless changing
                });

                // 2. Fetch Roles
                const rolesRes = await axios.get(`${API_URL}/roles/all`);
                const dbRoles = rolesRes.data.roles || [];

                // Static roles mock
                const staticRoles = [
                    { roleName: 'super_admin', rolePermissions: ['ALL'] },
                    { roleName: 'manager', rolePermissions: ['dashboards', 'calendar', 'chat'] }, // Example
                    { roleName: 'accountant', rolePermissions: ['dashboards', 'invoices'] }
                ];

                // Merge DB roles with static names if not present
                // Ideally backend should return consistent format. 
                // We'll normalize dbRoles to lower case roleName for matching.

                // Combined list
                const allRoles = [...dbRoles];

                // Add static if not in DB
                staticRoles.forEach(staticR => {
                    if (!allRoles.find(r => r.roleName === staticR.roleName)) {
                        allRoles.push(staticR);
                    }
                });

                setRoles(allRoles);

            } catch (err) {
                console.error("Error loading edit user data:", err);
                console.log("Error Response:", err.response); // Debug log
                setError("Failed to load user data or roles.");
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);

        try {
            await axios.put(`${API_URL}/auth/users/${id}`, formData, { withCredentials: true });
            // Success
            alert("User updated successfully!");
            navigate('/dashboard/existingusers');
        } catch (err) {
            console.error("Update failed:", err);
            setError(err.response?.data?.message || "Failed to update user.");
        } finally {
            setIsSaving(false);
        }
    };

    // Helper to get permissions for current selected role
    const getRolePermissions = () => {
        const selectedRole = roles.find(r => r.roleName === formData.role);
        if (!selectedRole) return [];
        if (selectedRole.rolePermissions.includes('ALL')) return ['Full System Access'];

        // Map permission IDs to Labels
        return selectedRole.rolePermissions.map(permId => {
            // Find in Menu Items (recursive search might be needed but let's try direct first or flat map)
            // Simplified search
            const found = MENU_ITEMS.find(item => item.id === permId)
                || MENU_ITEMS.flatMap(i => i.subItems || []).find(sub => sub.id === permId);
            return found ? found.label : permId;
        });
    };

    const currentPermissions = getRolePermissions();

    if (isLoading) return <div className="p-6">Loading user data...</div>;

    return (
        <div className="w-full p-6 font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                <h4 className="text-[18px] font-semibold text-[#495057] uppercase">Edit User</h4>
                <button
                    onClick={() => navigate('/dashboard/existingusers')}
                    className="text-skote-primary hover:underline text-sm flex items-center gap-1"
                >
                    <ArrowLeft size={14} /> Back to User List
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-lg shadow-sm border border-skote-border overflow-hidden">
                        <div className="p-6 border-b border-skote-border bg-gray-50/50">
                            <h5 className="text-[15px] font-semibold text-gray-700">User Information</h5>
                            <p className="text-[13px] text-gray-500 mt-1">Update user details and permissions</p>
                        </div>

                        <div className="p-6">
                            {error && (
                                <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100 flex items-center">
                                    <span className="mr-2">❌</span> {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-[13px] font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <User size={14} className="text-gray-400" /> Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-skote-primary focus:border-skote-primary outline-none transition-all"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-[13px] font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <Mail size={14} className="text-gray-400" /> Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-skote-primary focus:border-skote-primary outline-none transition-all"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Password (Optional) */}
                                    <div>
                                        <label className="block text-[13px] font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <Lock size={14} className="text-gray-400" /> Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Leave blank to keep current password"
                                            className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-skote-primary focus:border-skote-primary outline-none transition-all placeholder:text-gray-400"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Only fill this if you want to change the password.</p>
                                    </div>

                                    {/* Role */}
                                    <div>
                                        <label className="block text-[13px] font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <Shield size={14} className="text-gray-400" /> Role
                                        </label>
                                        <select
                                            name="role"
                                            className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-skote-primary focus:border-skote-primary outline-none transition-all bg-white"
                                            value={formData.role}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Role</option>
                                            {roles.map(r => (
                                                <option key={r.roleName} value={r.roleName}>
                                                    {r.roleName ? r.roleName.charAt(0).toUpperCase() + r.roleName.slice(1) : 'Unnamed'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* PERMISSIONS PREVIEW */}
                                {formData.role && (
                                    <div className="bg-blue-50/50 rounded-md p-4 border border-blue-100">
                                        <h6 className="text-[13px] font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                            <Shield size={12} /> Permissions for {formData.role}:
                                        </h6>
                                        <div className="flex flex-wrap gap-2">
                                            {currentPermissions.length > 0 ? (
                                                currentPermissions.map((perm, idx) => (
                                                    <span key={idx} className="bg-white text-blue-600 border border-blue-200 px-2 py-1 rounded text-[11px] font-medium shadow-sm">
                                                        {perm}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-500 text-[12px] italic">No specific permissions found</span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-gray-100 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className={`flex items-center gap-2 bg-[#556ee6] hover:bg-[#4458b8] text-white px-6 py-2.5 rounded-md font-medium text-[13px] shadow-sm transition-all
                                            ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}
                                        `}
                                    >
                                        {isSaving ? (
                                            <>Updating...</>
                                        ) : (
                                            <>
                                                <Save size={16} /> Update User
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <div className="bg-[#d4dafb] bg-opacity-20 rounded-lg p-6 border border-[#d4dafb] flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <span className="text-2xl font-bold text-[#556ee6]">{formData.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <h3 className="font-semibold text-gray-700 mb-1">{formData.name}</h3>
                        <span className="inline-block px-3 py-1 bg-white text-[#556ee6] text-xs font-medium rounded-full border border-[#d4dafb] shadow-sm">
                            {formData.role}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
