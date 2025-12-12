import React, { useState, useEffect } from "react";
import { Copy, Save, Layout, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MENU_ITEMS } from "../../../Components/constants"; // Updated path

const API_URL = "http://localhost:5000/api";

const EditRole = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [roleName, setRoleName] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    // Initial Load
    useEffect(() => {
        const fetchRoleData = async () => {
            try {
                // We need to find the specific role. API /roles/all returns all.
                // Ideally backend has /roles/:id, but if not we filter.
                // Looking at routes, we don't see GET /:id in roleRoutes. 
                // We only see create, all, update, delete.
                // So we fetch 'all' and find by ID.

                const response = await axios.get(`${API_URL}/roles/all`);
                const roles = response.data.roles || [];
                const role = roles.find(r => r.id === parseInt(id) || r.id === id);

                if (role) {
                    setRoleName(role.roleName);
                    setSelectedPermissions(role.rolePermissions || []);
                } else {
                    alert("Role not found!");
                    navigate('/dashboard/role');
                }
            } catch (error) {
                console.error("Failed to load role", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoleData();
    }, [id, navigate]);


    // Helper: toggle permission
    const togglePermission = (permId) => {
        setSelectedPermissions((prev) =>
            prev.includes(permId)
                ? prev.filter((id) => id !== permId)
                : [...prev, permId]
        );
    };

    // Helper: check if group (parent) is fully selected
    const isGroupSelected = (item) => {
        if (!item.subItems) return selectedPermissions.includes(item.id);
        return item.subItems.every((sub) => selectedPermissions.includes(sub.id));
    };

    // Helper: toggle entire group
    const toggleGroup = (item) => {
        if (!item.subItems) {
            togglePermission(item.id);
            return;
        }

        const allSubIds = item.subItems.map((sub) => sub.id);
        const isAllSelected = allSubIds.every((id) => selectedPermissions.includes(id));

        if (isAllSelected) {
            // Unselect all
            setSelectedPermissions((prev) =>
                prev.filter((id) => !allSubIds.includes(id))
            );
        } else {
            // Select all
            setSelectedPermissions((prev) => {
                const set = new Set([...prev, ...allSubIds]);
                return Array.from(set);
            });
        }
    };

    const handleUpdate = async () => {
        if (!roleName.trim()) {
            alert("Role Name is required");
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.put(`${API_URL}/roles/update/${id}`, {
                roleName,
                rolePermissions: selectedPermissions
            });
            alert("Role updated successfully!");
            navigate("/dashboard/role"); // Go back to list
        } catch (error) {
            console.error(error);
            alert("Failed to update role. Name might be duplicate.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="p-6">Loading role data...</div>;

    return (
        <div className="w-full font-sans">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2 pl-4 pr-4 pt-4">
                <h4 className="text-[18px] font-semibold text-[#495057] uppercase">Edit Role</h4>
                <button
                    onClick={() => navigate('/dashboard/role')}
                    className="text-skote-primary hover:underline text-sm flex items-center gap-1"
                >
                    <ArrowLeft size={14} /> Back to Role List
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Form & Permissions */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Role Name Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-[#e9e9ef] overflow-hidden">
                        <div className="p-4 border-b border-[#e9e9ef] bg-[#f8f9fa]">
                            <h5 className="font-semibold text-gray-700 flex items-center gap-2">
                                <Copy size={16} /> Role Details
                            </h5>
                        </div>
                        <div className="p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#556ee6] focus:ring-[#556ee6] text-sm p-2 border"
                                placeholder="e.g. Marketing Manager"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Permissions Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-[#e9e9ef] overflow-hidden">
                        <div className="p-4 border-b border-[#e9e9ef] bg-[#f8f9fa] flex justify-between items-center">
                            <h5 className="font-semibold text-gray-700 flex items-center gap-2">
                                <Layout size={16} /> Menu Permissions
                            </h5>
                            <div className="text-xs text-gray-500">
                                Select allowed pages for this role
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {MENU_ITEMS.filter(item => !item.isTitle).map((item) => (
                                    <div key={item.id} className="border border-gray-100 rounded-md p-3 hover:shadow-sm transition-shadow">

                                        {/* Parent Item */}
                                        <div className="flex items-center gap-3 mb-2">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-[#556ee6] focus:ring-[#556ee6] h-4 w-4 cursor-pointer"
                                                checked={isGroupSelected(item)}
                                                onChange={() => toggleGroup(item)}
                                            />
                                            <span className={`font-medium text-sm ${isGroupSelected(item) ? 'text-[#556ee6]' : 'text-gray-700'}`}>
                                                {item.label}
                                            </span>
                                        </div>

                                        {/* Sub Items */}
                                        {item.subItems && (
                                            <div className="ml-7 space-y-2 border-l-2 border-gray-100 pl-3">
                                                {item.subItems.map(sub => (
                                                    <div key={sub.id} className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            className="rounded border-gray-300 text-[#556ee6] focus:ring-[#556ee6] h-3.5 w-3.5 cursor-pointer"
                                                            checked={selectedPermissions.includes(sub.id)}
                                                            onChange={() => togglePermission(sub.id)}
                                                        />
                                                        <span className="text-sm text-gray-600">
                                                            {sub.label}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleUpdate}
                            disabled={isSubmitting}
                            className={`flex items-center gap-2 bg-[#556ee6] hover:bg-[#4458b8] text-white px-6 py-2.5 rounded-md font-medium shadow-sm transition-all
                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                `}
                        >
                            <Save size={18} />
                            {isSubmitting ? "Updating..." : "Update Role"}
                        </button>
                    </div>

                </div>

                {/* Right Column: Preview (Optional) */}
                <div className="lg:col-span-4">
                    <div className="bg-[#d4dafb] bg-opacity-20 rounded-lg p-6 border border-[#d4dafb] text-center sticky top-6">
                        <h6 className="text-[#556ee6] font-semibold mb-2">Permission Summary</h6>
                        <div className="text-3xl font-bold text-gray-800 mb-1">{selectedPermissions.length}</div>
                        <p className="text-gray-500 text-sm">Access Points Granted</p>

                        <div className="mt-6 flex flex-wrap justify-center gap-1">
                            {selectedPermissions.slice(0, 5).map(p => (
                                <span key={p} className="text-[10px] bg-white border border-blue-100 px-2 py-1 rounded text-gray-600">
                                    {p}
                                </span>
                            ))}
                            {selectedPermissions.length > 5 && (
                                <span className="text-[10px] text-gray-400 px-1 py-1">+{selectedPermissions.length - 5} more</span>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EditRole;
