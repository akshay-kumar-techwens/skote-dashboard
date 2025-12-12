import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Check, Shield, Layout, Settings } from 'lucide-react';
import { MENU_ITEMS } from '../../../Components/constants';

// Group permissions by category for better UI
const PERMISSION_GROUPS = MENU_ITEMS
    .filter(item => !item.isSectionHeader)
    .reduce((acc, item) => {
        // Use section headers or default categories if simpler
        // Here we just group by top level label
        acc.push({
            id: item.id,
            label: item.label,
            icon: item.icon,
            subItems: item.subItems || []
        });
        return acc;
    }, []);

const CreateRole = () => {
    const [roleName, setRoleName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const togglePermission = (permissionId) => {
        setSelectedPermissions(prev => {
            if (prev.includes(permissionId)) {
                return prev.filter(p => p !== permissionId);
            } else {
                return [...prev, permissionId];
            }
        });
    };

    const toggleGroup = (group) => {
        const groupIds = [group.id, ...(group.subItems?.map(s => s.id) || [])];
        const allSelected = groupIds.every(id => selectedPermissions.includes(id));

        if (allSelected) {
            // Deselect all
            setSelectedPermissions(prev => prev.filter(id => !groupIds.includes(id)));
        } else {
            // Select all
            const newIds = groupIds.filter(id => !selectedPermissions.includes(id));
            setSelectedPermissions(prev => [...prev, ...newIds]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.post('http://localhost:5000/api/roles/create', {
                roleName,
                rolePermissions: selectedPermissions
            }, { withCredentials: true });

            alert('Role created successfully!');
            navigate('/dashboard/default');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 min-h-screen bg-gray-50/50">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Create New Role</h1>
                    <p className="text-gray-500 mt-1">Define access levels and permissions for new team members.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Role Name Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Role Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full max-w-md px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    value={roleName}
                                    onChange={(e) => setRoleName(e.target.value)}
                                    placeholder="e.g. Sales Manager"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Give a descriptive name to this role.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Permissions Grid */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="mb-6 pb-6 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <Layout className="w-5 h-5 text-gray-500" />
                                Component Permissions
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Select which components users with this role can access.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {PERMISSION_GROUPS.map((group) => {
                                // Check if main item is selected
                                const isMainSelected = selectedPermissions.includes(group.id);
                                // Check if all subitems are selected
                                const subItemIds = group.subItems.map(s => s.id);
                                const areAllSubsSelected = subItemIds.length > 0 && subItemIds.every(id => selectedPermissions.includes(id));

                                const isGroupFullySelected = isMainSelected && (subItemIds.length === 0 || areAllSubsSelected);

                                return (
                                    <div key={group.id} className={`
                                        border rounded-xl transition-all duration-200 overflow-hidden
                                        ${isGroupFullySelected ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200 bg-white hover:border-gray-300'}
                                    `}>
                                        {/* Header / Main Permission */}
                                        <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => toggleGroup(group)}>
                                            <div className="flex items-center gap-3">
                                                {group.icon && <group.icon className={`w-5 h-5 ${isGroupFullySelected ? 'text-blue-600' : 'text-gray-400'}`} />}
                                                <span className={`font-medium ${isGroupFullySelected ? 'text-blue-700' : 'text-gray-700'}`}>
                                                    {group.label}
                                                </span>
                                            </div>
                                            <div className={`
                                                w-5 h-5 rounded border flex items-center justify-center transition-colors
                                                ${isGroupFullySelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}
                                            `}>
                                                {isGroupFullySelected && <Check className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                        </div>

                                        {/* Sub Items */}
                                        {group.subItems.length > 0 && (
                                            <div className="px-4 pb-4 pt-1 space-y-2 border-t border-gray-100/50">
                                                {group.subItems.map(sub => {
                                                    const isSelected = selectedPermissions.includes(sub.id);
                                                    return (
                                                        <div
                                                            key={sub.id}
                                                            className="flex items-center justify-between pl-8 py-1.5 cursor-pointer group/item"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                togglePermission(sub.id);
                                                            }}
                                                        >
                                                            <span className={`text-sm ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-500 group-hover/item:text-gray-700'}`}>
                                                                {sub.label}
                                                            </span>
                                                            <div className={`
                                                                w-4 h-4 rounded border flex items-center justify-center transition-colors
                                                                ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-200'}
                                                            `}>
                                                                {isSelected && <Check className="w-3 h-3 text-white" />}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard/default')}
                            className="mr-4 px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !roleName}
                            className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating Role...
                                </span>
                            ) : (
                                'Create Role'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRole;
