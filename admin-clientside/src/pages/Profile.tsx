import { useNavigate } from 'react-router-dom';
import { UserIcon, ShieldCheckIcon, BellIcon, HelpCircleIcon, LogOutIcon } from 'lucide-react';

// Mock driver data
const mockDriverData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '(555) 123-4567',
  profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
};

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="p-6 space-y-8">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-md">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src={mockDriverData.profileImage}
            alt={mockDriverData.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{mockDriverData.name}</h2>
          <p className="text-sm text-gray-500">{mockDriverData.email}</p>
          <p className="text-sm text-gray-500">{mockDriverData.phone}</p>
        </div>
      </div>

      {/* Account Section */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200 flex items-center">
          <UserIcon size={24} className="mr-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Account</p>
            <p className="text-gray-900">{mockDriverData.email}</p>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
          <div className="flex items-center">
            <ShieldCheckIcon size={24} className="mr-4 text-gray-500" />
            <span className="text-gray-900">Security</span>
          </div>
          <ChevronRightIcon size={20} className="text-gray-400" />
        </button>
        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
          <div className="flex items-center">
            <BellIcon size={24} className="mr-4 text-gray-500" />
            <span className="text-gray-900">Notifications</span>
          </div>
          <ChevronRightIcon size={20} className="text-gray-400" />
        </button>
        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
          <div className="flex items-center">
            <HelpCircleIcon size={24} className="mr-4 text-gray-500" />
            <span className="text-gray-900">Help</span>
          </div>
          <ChevronRightIcon size={20} className="text-gray-400" />
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full p-4 flex items-center justify-center bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
      >
        <LogOutIcon size={20} className="mr-2" />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

const ChevronRightIcon = ({
  size,
  className,
}: {
  size: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default ProfilePage;