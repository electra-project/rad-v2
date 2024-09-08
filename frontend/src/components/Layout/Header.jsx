import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link
          to={`/dashboard/${
            auth?.user?.role === 1 ? "user/profile" : "user/profile"
          }`}
        >
          Profile
        </Link>
      </Menu.Item>
      {auth?.user?.role === 1 && (
        <Menu.Item key="dashboard">
          <Link to={`/dashboard/admin/create-category`}>Dashboard</Link>
        </Menu.Item>
      )}
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const categoryMenu = (
    <Menu>
      {categories?.map((c) => (
        <Menu.Item key={c._id}>
          <Link to={`/category/${c.slug}`}>{c.name}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="bg-[#161616] text-white">
      <header className="flex flex-col md:flex-row items-center justify-between p-4">
        {/* Logo and Hamburger Menu */}
        <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
          <Link to="/" className="flex items-center space-x-4">
            <img
              alt="Company logo with a red and white design"
              className="h-10"
              src="https://avatars.githubusercontent.com/u/179117556?s=400&u=fc563dd3a693849215af22a202b08b18c0c37d3a&v=4"
              width="40"
              height="40"
            />
            <h1 className="text-sm font-bold text-white m-0">Electra</h1>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Navigation Links (Mobile) */}
        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden flex-col w-full space-y-4 mb-4`}>
          <NavLink to="/" className="text-sm hover:text-gray-400">HOME</NavLink>
          <NavLink to="/category" className="text-sm hover:text-gray-400">STORE</NavLink>
          <NavLink to="/contact" className="text-sm hover:text-gray-400">CONTACT US</NavLink>
        </nav>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className="text-xs hover:text-gray-400">HOME</NavLink>
          <NavLink to="/category" className="text-xs hover:text-gray-400">STORE</NavLink>
          <NavLink to="/contact" className="text-xs hover:text-gray-400">CONTACT US</NavLink>
        </nav>

        {/* Search and Category Selector */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="flex items-center w-full md:w-auto">
            <SearchInput className="w-full md:w-64 lg:w-80" />
            <Dropdown overlay={categoryMenu} placement="bottomRight">
              <button className="text-white px-4 py-2 text-sm rounded-r-md hover:bg-gray-800 focus:outline-none">
                SELECT CATEGORY
              </button>
            </Dropdown>
          </div>
          <button
            type="submit"
            className="text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        {/* User Actions (Login/Register, Cart) */}
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          {!auth?.user ? (
            <NavLink to="/login" className="text-xs hover:text-gray-400">
              LOGIN / REGISTER
            </NavLink>
          ) : (
            <Dropdown overlay={userMenu} placement="bottomRight">
              <button className="flex items-center space-x-2 text-xs hover:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span className="hidden md:inline">{auth.user.name}</span>
              </button>
            </Dropdown>
          )}
          <NavLink
            to="/cart"
            className="relative flex items-center hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <Badge
              count={cart?.length}
              showZero
              offset={[0, -10]}
              style={{
                backgroundColor: "electra-red",
                color: "white",
                fontSize: "0.6rem",
              }}
            />
          </NavLink>
        </div>
      </header>
    </div>
  );
};

export default Header;