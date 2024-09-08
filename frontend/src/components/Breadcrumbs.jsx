import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeIcon, ChevronRightIcon } from "lucide-react";

const Breadcrumbs = ({ categoryName }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="flex items-center text-sm font-medium text-gray-400 mb-4">
      <Link to="/" className="flex items-center hover:text-white">
        <HomeIcon className="w-4 h-4 mr-2" />
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={name}>
            <ChevronRightIcon className="w-4 h-4 mx-2" />
            {isLast ? (
              <span className="text-white capitalize">
                {categoryName || name}
              </span>
            ) : (
              <Link to={routeTo} className="hover:text-white capitalize">
                {name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
