import React from 'react';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sidebar from './Components/Sidebar/Sidebar';
import Header from './Components/Header/Header';

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#f8f8fb] overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar/Header */}
        <Header />

        {/* Scrollable Dashboard Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default App;