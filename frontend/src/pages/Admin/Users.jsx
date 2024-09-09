import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Get all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/get-users");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/auth/delete-user/${userId}`);
      toast.success(data.message);
      getAllUsers();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the user");
    }
  };

  // Make user admin
  const handleMakeAdmin = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to make this user an admin?");
    if (!confirmed) return;

    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/auth/make-admin/${userId}`);
      toast.success(data.message);
      getAllUsers();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while making the user an admin");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="w-full p-6 bg-[#1A1A1A] text-white min-h-screen">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">ALL USERS</h1>
            <div className="flex flex-col md:flex-row flex-wrap gap-4">
              {users?.map((user) => (
                <div key={user._id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                  <div className="bg-[#222222] border border-gray-700 rounded-lg p-4 shadow-lg">
                    <h5 className="text-lg md:text-xl font-bold">{user.name}</h5>
                    <p className="text-gray-300">{user.email}</p>
                    <p className="text-gray-300">{user.phone}</p>
                    <p className="text-gray-300">{user.address}</p>
                    <p className="text-gray-300">Role: {user.role === 1 ? "Admin" : "User"}</p>
                    {user.role !== 1 && (
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                        >
                          Delete User
                        </button>
                        <button
                          onClick={() => handleMakeAdmin(user._id)}
                          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        >
                          Make Admin
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;