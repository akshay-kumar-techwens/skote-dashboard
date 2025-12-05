import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './Components/Sidebar/Sidebar';
import Header from './Components/Header/Header';
import Dashboard from './Pages/Dashboard/Dashboard';

import SignupPage from './Pages/Auth/Signup/SignupPage';
import LoginPage from './Pages/Auth/Login/LoginPage';

// Layout for protected pages (Dashboard Layout)
const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-[#f8f8fb] overflow-hidden font-sans">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Header */}
                <Header />

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <Routes>

                {/* Public Routes */}
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Dashboard Routes */}
                <Route
                    path="/"
                    element={
                        <LoginPage />
                    }
                />

                {/* Example: Add more dashboard routes */}
                <Route
                    path="/dashboard"
                    element={
                        <DashboardLayout>
                            <Dashboard />
                        </DashboardLayout>
                    }
                />

            </Routes>
        </Router>
    );
};

export default App;
