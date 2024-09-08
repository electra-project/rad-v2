import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="w-full p-4 bg-[#1A1A1A] text-white min-h-screen">
      <div className="bg-[#222222] p-4 rounded-lg">
        <h4 className="text-2xl font-bold mb-4">Dashboard</h4>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/dashboard/user/profile"
            className="block p-3 rounded-lg hover:bg-blue-600 transition-colors"
            activeClassName="bg-blue-600"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="block p-3 rounded-lg hover:bg-blue-600 transition-colors"
            activeClassName="bg-blue-600"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
