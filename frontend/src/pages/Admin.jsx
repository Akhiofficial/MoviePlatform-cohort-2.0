import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';
import DashboardOverview from '../components/DashboardOverview';

const Admin = () => {
    return (
        <div className="flex bg-[#161111] min-h-screen text-white font-sans selection:bg-brand-red selection:text-white">

            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full bg-[#1A1111]">

                {/* Topbar */}
                <AdminTopbar />

                {/* Dashboard Scrollable Body */}
                <DashboardOverview />

            </main>
        </div>
    );
};

export default Admin;
