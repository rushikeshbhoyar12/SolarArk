import React, { useState } from "react";

const DashboardNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="bg-orange-700 shadow-lg">
      <nav className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <a href="#" className="text-white text-xl font-bold">
            Dashboard
          </a>
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="btn mx-6 text-white bg-orange-900 drawer-button">|</label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
              </ul>
            </div>
          </div>
        </div>




        {/* User Profile Dropdown */}
        <div className="relative flex items-center">
          <button
            className="text-white hover:text-gray-200 focus:outline-none"
            onClick={() => setUserMenuOpen(!isUserMenuOpen)}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </button>
          {isUserMenuOpen && (
            <div className="absolute top-8 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <a
                href="#profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="/dashboardlogin"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="flex md:hidden">
          <button
            className="text-white hover:text-gray-200 focus:outline-none"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-500">
          <a
            href="#overview"
            className="block px-4 py-2 text-white hover:bg-blue-700"
          >
            Overview
          </a>
          <a
            href="#analytics"
            className="block px-4 py-2 text-white hover:bg-blue-700"
          >
            Analytics
          </a>
          <a
            href="#settings"
            className="block px-4 py-2 text-white hover:bg-blue-700"
          >
            Settings
          </a>
        </div>
      )}
    </div>
  );
};

export default DashboardNavbar;
