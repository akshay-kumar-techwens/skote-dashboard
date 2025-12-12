import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from './Components/Layout/DashboardLayout';

// Auth Pages
import SignupPage from './Pages/Auth/Signup/SignupPage';
import LoginPage from './Pages/Auth/Login/LoginPage';

// Dashboard Pages
import Dashboard from './Pages/Dashboard/Dashboard';
import EmployeeList from './Pages/Dashboard/Subpages/EmployeeList';

import CreateRole from './Pages/Dashboard/Subpages/CreateRole';
import EditUser from './Pages/Dashboard/Subpages/EditUser';
import RoleList from './Pages/Dashboard/Subpages/RoleList';
import EditRole from './Pages/Dashboard/Subpages/EditRole';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Navigate to="/dashboard/default" replace />} />
                <Route path="default" element={<Dashboard />} />
                <Route path="existingusers" element={<EmployeeList />} />

                {/* Add more dashboard routes here as needed */}
                <Route path="createroles" element={<CreateRole />} />
                <Route path="edit-user/:id" element={<EditUser />} />
                <Route path="role" element={<RoleList />} />
                <Route path="edit-role/:id" element={<EditRole />} />
                <Route path="blog" element={<div>Blog Dashboard (Placeholder)</div>} />
                <Route path="job" element={<div>Job Dashboard (Placeholder)</div>} />
            </Route>

            {/* Apps & Pages Routes */}
            <Route path="/calendar" element={<DashboardLayout><div className="p-6">Calendar App (Placeholder)</div></DashboardLayout>} />
            <Route path="/chat" element={<DashboardLayout><div className="p-6">Chat App (Placeholder)</div></DashboardLayout>} />
            <Route path="/file-manager" element={<DashboardLayout><div className="p-6">File Manager (Placeholder)</div></DashboardLayout>} />

            <Route path="/ecommerce" element={<DashboardLayout />}>
                <Route path="products" element={<div className="p-6">Products (Placeholder)</div>} />
                <Route path="orders" element={<div className="p-6">Orders (Placeholder)</div>} />
                <Route path="product-detail" element={<div className="p-6">Product Detail (Placeholder)</div>} />
                <Route path="customers" element={<div className="p-6">Customers (Placeholder)</div>} />
                <Route path="cart" element={<div className="p-6">Cart (Placeholder)</div>} />
                <Route path="checkout" element={<div className="p-6">Checkout (Placeholder)</div>} />
                <Route path="shops" element={<div className="p-6">Shops (Placeholder)</div>} />
                <Route path="add-product" element={<div className="p-6">Add Product (Placeholder)</div>} />
            </Route>

            <Route path="/crypto" element={<DashboardLayout />}>
                <Route path="wallet" element={<div className="p-6">Wallet (Placeholder)</div>} />
                <Route path="buy-sell" element={<div className="p-6">Buy/Sell (Placeholder)</div>} />
                <Route path="exchange" element={<div className="p-6">Exchange (Placeholder)</div>} />
                <Route path="lending" element={<div className="p-6">Lending (Placeholder)</div>} />
                <Route path="orders" element={<div className="p-6">Orders (Placeholder)</div>} />
                <Route path="kyc-application" element={<div className="p-6">KYC Application (Placeholder)</div>} />
                <Route path="ico-landing" element={<div className="p-6">ICO Landing (Placeholder)</div>} />
            </Route>

            <Route path="/email" element={<DashboardLayout />}>
                <Route path="inbox" element={<div className="p-6">Inbox (Placeholder)</div>} />
                <Route path="read" element={<div className="p-6">Read Email (Placeholder)</div>} />
                <Route path="templates" element={<div className="p-6">Templates (Placeholder)</div>} />
            </Route>

            <Route path="/invoices" element={<DashboardLayout />}>
                <Route path="list" element={<div className="p-6">Invoice List (Placeholder)</div>} />
                <Route path="detail" element={<div className="p-6">Invoice Detail (Placeholder)</div>} />
            </Route>

            <Route path="/projects" element={<DashboardLayout />}>
                <Route path="grid" element={<div className="p-6">Projects Grid (Placeholder)</div>} />
                <Route path="list" element={<div className="p-6">Projects List (Placeholder)</div>} />
                <Route path="overview" element={<div className="p-6">Project Overview (Placeholder)</div>} />
                <Route path="create" element={<div className="p-6">Create New (Placeholder)</div>} />
            </Route>

            <Route path="/tasks" element={<DashboardLayout />}>
                <Route path="list" element={<div className="p-6">Task List (Placeholder)</div>} />
                <Route path="kanban" element={<div className="p-6">Kanban Board (Placeholder)</div>} />
                <Route path="create" element={<div className="p-6">Create Task (Placeholder)</div>} />
            </Route>

            <Route path="/contacts" element={<DashboardLayout />}>
                <Route path="grid" element={<div className="p-6">User Grid (Placeholder)</div>} />
                <Route path="list" element={<div className="p-6">User List (Placeholder)</div>} />
                <Route path="profile" element={<div className="p-6">Profile (Placeholder)</div>} />
            </Route>

            <Route path="/blog" element={<DashboardLayout />}>
                <Route path="list" element={<div className="p-6">Blog List (Placeholder)</div>} />
                <Route path="grid" element={<div className="p-6">Blog Grid (Placeholder)</div>} />
                <Route path="details" element={<div className="p-6">Blog Details (Placeholder)</div>} />
            </Route>

            <Route path="/jobs" element={<DashboardLayout />}>
                <Route path="list" element={<div className="p-6">Job List (Placeholder)</div>} />
                <Route path="grid" element={<div className="p-6">Job Grid (Placeholder)</div>} />
                <Route path="apply" element={<div className="p-6">Apply Job (Placeholder)</div>} />
                <Route path="details" element={<div className="p-6">Job Details (Placeholder)</div>} />
                <Route path="candidate-list" element={<div className="p-6">Candidate List (Placeholder)</div>} />
                <Route path="candidate-overview" element={<div className="p-6">Candidate Overview (Placeholder)</div>} />
            </Route>

            {/* Fallback */}
            {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
        </Routes>
    );
};

export default AppRoutes;
