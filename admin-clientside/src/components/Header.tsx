import React from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, BellIcon, UserIcon } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-gray-50 border-b border-gray-300 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:hidden"
              onClick={onMenuClick}
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800 ml-2 md:ml-0">
                Quiz Admin
              </h1>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center">
            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-4 mr-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/create"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Create Question
              </Link>
              <Link
                to="/questions"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                View Questions
              </Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800">
                <BellIcon className="h-6 w-6" />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <UserIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;