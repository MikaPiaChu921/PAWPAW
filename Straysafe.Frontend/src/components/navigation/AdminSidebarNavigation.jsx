import React from "react";
import NavItem from "./items/NavItem";
import { LogoutAccount } from "../utilities/services/AuthenticationHandler";
import { ApplicationConstants } from "../../contants/ApplicationConstants";

function AdminSidebarNavigation() {
  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div>
          <img src={ApplicationConstants.StraySafeLogo1} />
          <h1 className="text-center primary-1 font-bold text-[30px]">
            Admin Portal
          </h1>
        </div>
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <NavItem itemName="Home" />
            <NavItem itemName="User Activities" />
            <NavItem itemName="Announcements" />
            <NavItem itemName="Reports" />
            <NavItem itemName="Users" />
            <NavItem itemName="Donation" />
            <NavItem itemName=" " disabled />
            <NavItem itemName="Notifications" />
            <NavItem
              itemName="Logout"
              onClick={LogoutAccount}
              hoverBackgroundColor="#FF0000"
            />
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default AdminSidebarNavigation;
