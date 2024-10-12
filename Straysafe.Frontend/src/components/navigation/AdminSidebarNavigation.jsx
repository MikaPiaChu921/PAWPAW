import React from "react";
import NavItem from "./items/NavItem";
import { LogoutAccount } from "../utilities/services/AuthenticationHandler";
import { ApplicationConstants } from "../../contants/ApplicationConstants";

function AdminSidebarNavigation({ setActiveDashboard, activeDashboard }) {
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
            <NavItem
              itemName="Home"
              callBack={setActiveDashboard}
              active={activeDashboard}
            />
            <NavItem
              itemName="User Activities"
              callBack={setActiveDashboard}
              active={activeDashboard}
            />
            <NavItem
              itemName="Announcements"
              callBack={setActiveDashboard}
              active={activeDashboard}
            />
            <NavItem
              itemName="Reports"
              callBack={setActiveDashboard}
              active={activeDashboard}
            />
            <NavItem
              itemName="Users"
              callBack={setActiveDashboard}
              active={activeDashboard}
            />
            <NavItem
              itemName="Donation"
              callBack={setActiveDashboard}
              active={activeDashboard}
            />
            <NavItem itemName=" " disabled />
            <NavItem
              itemName="Notifications"
              callBack={setActiveDashboard}
              active={activeDashboard}
            />
            <NavItem
              itemName="Logout"
              onClick={LogoutAccount}
              highlightColor="#ff1a1a"
            />
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default AdminSidebarNavigation;
