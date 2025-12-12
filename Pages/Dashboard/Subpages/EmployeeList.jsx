import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Search, Filter } from 'lucide-react';

import axios from 'axios';

// API Call
const fetchEmployees = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/auth/users', { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching users", error);
        throw error;
    }
};

const EmployeeList = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchEmployees();
                // Map backend data to frontend structure if needed, or just use as is if fields match
                // Backend: id, name, role, email
                // Frontend expects: id, name, role, avatar
                const mappedData = data.map(user => ({
                    ...user,
                    avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`
                }));
                setEmployees(mappedData);
            } catch (error) {
                console.error("Failed to fetch employees", error);
                if (error.response && error.response.status === 401) {
                    alert("Session expired. Please login again.");
                    // You might want to redirect here, e.g. navigate('/login')
                } else {
                    alert("Failed to load users. check console for details.");
                }
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:5000/api/auth/users/${id}`, { withCredentials: true });
                setEmployees(prev => prev.filter(emp => emp.id !== id));
            } catch (error) {
                console.error("Failed to delete user", error);
                alert("Failed to delete user. Please try again.");
            }
        }
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Page Title & Breadcrumb */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pl-4 pr-4">
                <h1 className="text-lg font-semibold uppercase text-skote-text tracking-wide">
                    Employee List
                </h1>
                <nav className="flex text-sm text-skote-muted mt-2 sm:mt-0">
                    <span className="hover:text-skote-primary cursor-pointer">Contacts</span>
                    <span className="mx-2">/</span>
                    <span className="text-skote-text">User List</span>
                </nav>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-skote-border">
                    {/* Card Header / Toolbar */}
                    <div className="p-4 border-b border-skote-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                        <div className="relative w-full sm:w-72">
                            <label htmlFor="search-employee" className="sr-only">Search</label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={16} className="text-skote-muted" />
                            </div>
                            <input
                                id="search-employee"
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:border-skote-primary focus:ring-1 focus:ring-skote-primary sm:text-sm transition duration-150 ease-in-out"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>

                        <div className="flex gap-2">
                            {/* Visual Filter Button - Functionally redundant with search but requested */}
                            <button className="flex items-center gap-2 px-4 py-2 bg-skote-light text-skote-text rounded-md hover:bg-gray-200 transition-colors border border-skote-border text-sm font-medium">
                                <Filter size={16} />
                                <span>Filter</span>
                            </button>
                        </div>
                    </div>

                    {/* Table Content */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-skote-border">
                            <thead className="bg-[#f8f9fa]">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-[#495057] uppercase tracking-wider">
                                        User Name
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-[#495057] uppercase tracking-wider">
                                        User Role
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-[#495057] uppercase tracking-wider w-32">
                                        Edit User
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-[#495057] uppercase tracking-wider w-32">
                                        Delete User
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-skote-border">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-10 text-center text-skote-muted">
                                            Loading employees...
                                        </td>
                                    </tr>
                                ) : filteredEmployees.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-10 text-center text-skote-muted">
                                            No employees found matching "{searchTerm}"
                                        </td>
                                    </tr>
                                ) : (
                                    filteredEmployees.map((employee) => (
                                        <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full object-cover border border-skote-border" src={employee.avatar} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-skote-text">{employee.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-skote-muted bg-skote-light inline-block px-3 py-1 rounded-full border border-skote-border font-medium">
                                                    {employee.role}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <button
                                                    onClick={() => navigate(`/dashboard/edit-user/${employee.id}`)}
                                                    className="text-skote-primary hover:text-blue-700 bg-blue-50 hover:bg-blue-100 p-2 rounded-md transition-colors"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <button
                                                    onClick={() => handleDelete(employee.id)}
                                                    className="text-skote-danger hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-md transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer (Visual) */}
                    <div className="px-6 py-4 border-t border-skote-border flex items-center justify-between">
                        <span className="text-sm text-skote-muted">
                            Showing <span className="font-semibold">{filteredEmployees.length}</span> entries
                        </span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 rounded-md border border-skote-border text-skote-muted hover:bg-skote-light text-sm disabled:opacity-50" disabled>Previous</button>
                            <button className="px-3 py-1 rounded-md bg-skote-primary text-white text-sm">1</button>
                            <button className="px-3 py-1 rounded-md border border-skote-border text-skote-muted hover:bg-skote-light text-sm">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
