import React from 'react';
import SideNav from '../ui/dashboard/sidenav';
type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="md: flex h-screen flex-col overflow-hidden md:flex-row">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 ">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;

// NOTE: Dashboard has some sort of navigation that is share accross multiple pages, in next.js you can use a special layout.tsx fle to create UI that is sharebetween multiple pages.

// Partial rendering: one benefit of usiing layout in next.js is that on navigation, only the page component update whilte teh layout wont-re-render. this called partial rendering.
