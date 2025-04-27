import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, PlusCircleIcon, ListIcon, SettingsIcon, UsersIcon } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-40 w-64 bg-gray-50 border-r border-gray-200 transition-transform duration-300 ease-in-out md:translate-x-0`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h2 className="text-xl font-semibold text-teal-600">Quiz Admin</h2>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg ${
                    isActive
                      ? 'bg-teal-100 text-teal-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
                end
              >
                <HomeIcon className="w-6 h-6" />
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/usermng"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg ${
                    isActive
                      ? 'bg-teal-100 text-teal-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <UsersIcon className="w-6 h-6" />
                <span className="ml-3">Manage Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg ${
                    isActive
                      ? 'bg-teal-100 text-teal-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <PlusCircleIcon className="w-6 h-6" />
                <span className="ml-3">Create Question</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/questions"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg ${
                    isActive
                      ? 'bg-teal-100 text-teal-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <ListIcon className="w-6 h-6" />
                <span className="ml-3">View Questions</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg ${
                    isActive
                      ? 'bg-teal-100 text-teal-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <SettingsIcon className="w-6 h-6" />
                <span className="ml-3">Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
                alt="Admin Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs font-medium text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;