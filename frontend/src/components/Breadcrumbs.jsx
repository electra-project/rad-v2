import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, ChevronRightIcon } from "lucide-react";

const Breadcrumbs = ({ categoryName }) => {
  return (
    <nav className="flex items-center text-sm font-medium text-gray-400 mb-4">
      <Link to="/" className="flex items-center hover:text-white">
        <HomeIcon className="w-4 h-4 mr-2" />
        Home
      </Link>
      <ChevronRightIcon className="w-4 h-4 mx-2" />
      <Link to="/store/category" className="hover:text-white">
        Store
      </Link>
      <ChevronRightIcon className="w-4 h-4 mx-2" />
      <Link to="/store/category" className="hover:text-white">
        Category
      </Link>
      <ChevronRightIcon className="w-4 h-4 mx-2" />
      <span className="text-white">{categoryName}</span>
    </nav>
  );
};

export default Breadcrumbs;
