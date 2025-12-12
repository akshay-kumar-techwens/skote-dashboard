import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Edit, Trash2, Shield, Plus } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const RoleList = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get(`${API_URL}/roles/all`);
            // Backend returns { roles: [...] }
            setRoles(response.data.roles || []);
        } catch (error) {
            console.error("Error fetching roles", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this role? Users assigned to this role might be affected.')) {
            try {
                await axios.delete(`${API_URL}/roles/delete/${id}`);
                setRoles(prev => prev.filter(role => role.id !== id));
                alert("Role deleted successfully");
            } catch (error) {
                console.error("Failed to delete role", error);
                alert("Failed to delete role. It might be in use or server error.");
            }
        }
    };

    return (
        <div className="w-full font-sans">
            {/* Page Title */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pl-4 pr-4">
                <h1 className="text-lg font-semibold uppercase text-gray-700 tracking-wide">
                    Role Management
                </h1>
                <button
                    onClick={() => navigate('/dashboard/createroles')}
                    className="mt-2 sm:mt-0 bg-[#556ee6] hover:bg-[#4458b8] text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-all shadow-sm"
                >
                    <Plus size={16} /> Create New Role
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#f8f9fa]">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Role Name
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Permissions
                                </th>
                                <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                                        Loading roles...
                                    </td>
                                </tr>
                            ) : roles.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                                        No roles found. Create one!
                                    </td>
                                </tr>
                            ) : (
                                roles.map((role) => (
                                    <tr key={role.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                                                    <Shield size={18} />
                                                </div>
                                                <div className="text-sm font-medium text-gray-700 capitalize">
                                                    {role.roleName}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {role.rolePermissions && role.rolePermissions.includes('ALL') ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Full Access
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-gray-500">
                                                        {role.rolePermissions ? `${role.rolePermissions.length} Permissions` : '0 Permissions'}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => navigate(`/dashboard/edit-role/${role.id}`)}
                                                    className="text-[#556ee6] hover:bg-blue-50 p-2 rounded-md transition-colors"
                                                    title="Edit Role"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(role.id)}
                                                    className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"
                                                    title="Delete Role"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RoleList;
