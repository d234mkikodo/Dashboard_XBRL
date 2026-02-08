import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Home, LayoutDashboard } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition">
            <div className="bg-white p-2 rounded-lg">
              <TrendingUp size={28} className="text-blue-600" />
            </div>
            <div>
              <span className="text-xl font-bold">XBRL Stock Viewer</span>
              <div className="text-xs text-blue-200">Professional Stock Analysis</div>
            </div>
          </Link>
          <div className="flex space-x-2">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                isActive('/') 
                  ? 'bg-white text-blue-600 font-semibold' 
                  : 'hover:bg-blue-700'
              }`}
            >
              <Home size={18} />
              <span>หน้าแรก</span>
            </Link>
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                isActive('/dashboard') 
                  ? 'bg-white text-blue-600 font-semibold' 
                  : 'hover:bg-blue-700'
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
