import React from "react";
import AdminSidebarNavigation from "../../components/navigation/AdminSidebarNavigation";
import PageContainer from "../../components/containers/PageContainer";
import MainDashboard from "./subpages/MainDashboard";

function AdminDashboard() {
  return (
    <div>
      <AdminSidebarNavigation />
      <div className="absolute w-auto right-0 sm:left-64 left-0">
        <PageContainer>
          <MainDashboard />
        </PageContainer>
      </div>
    </div>
  );
}

export default AdminDashboard;
