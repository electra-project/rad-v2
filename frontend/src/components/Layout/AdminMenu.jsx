import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="w-full p-4 bg-[#1A1A1A] text-white min-h-screen">
      <div className="bg-[#222222] p-4 rounded-lg">
        <h4 className="text-2xl font-bold mb-4">Admin Panel</h4>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/dashboard/admin/create-category"
            className="block p-3 rounded-lg hover:bg-blue-600 transition-colors"
            activeClassName="bg-blue-600"
          >
            Manage Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="block p-3 rounded-lg hover:bg-blue-600 transition-colors"
            activeClassName="bg-blue-600"
          >
            Create Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="block p-3 rounded-lg hover:bg-blue-600 transition-colors"
            activeClassName="bg-blue-600"
          >
            Manage Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="block p-3 rounded-lg hover:bg-blue-600 transition-colors"
            activeClassName="bg-blue-600"
          >
            Orders
          </NavLink>
          {/* Uncomment if you need the Users link */}
          {/* <NavLink
            to="/dashboard/admin/users"
            className="block p-3 rounded-lg hover:bg-blue-600 transition-colors"
            activeClassName="bg-blue-600"
          >
            Users
          </NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
