import React, { ReactNode, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CalendarComponent from './Calendar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Horizontal Layout: Sidebar | Main Content | Calendar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200">
          <Sidebar isOpen={sidebarOpen} />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-5xl mx-auto">{children}</div>
        </main>

        {/* Calendar */}
        <aside className="hidden lg:block w-80 p-4 bg-gray-50 border-l border-gray-200 overflow-y-auto">
          <CalendarComponent />
        </aside>
      </div>
    </div>
  );
};

export default Layout;
