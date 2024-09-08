import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();
  //
  const navigate = useNavigate();
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/v1/auth/profile",
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmDelete) {
      try {
        const { data } = await axios.delete("http://localhost:8080/api/v1/auth/delete-own-account");
        if (data.error) {
          toast.error(data.error);
        } else {
          setAuth({ user: null, token: "" });
          localStorage.removeItem("auth");
          toast.success("Your account has been deleted successfully");
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while deleting your account");
      }
    }
  };

  return (
    <Layout title="Your Profile">
      <div className="w-full p-4 bg-[#1A1A1A] text-white min-h-screen">
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="w-full md:w-1/4">
            <UserMenu />
          </div>
          <div className="w-full md:w-3/4 bg-[#222222] p-6 rounded-lg">
            <h4 className="text-2xl font-bold mb-6">USER PROFILE</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-[#333333] text-white border border-[#444444] rounded-lg"
                  placeholder="Enter Your Name"
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-[#333333] text-white border border-[#444444] rounded-lg"
                  placeholder="Enter Your Email"
                  disabled
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-[#333333] text-white border border-[#444444] rounded-lg"
                  placeholder="Enter Your Password"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-[#333333] text-white border border-[#444444] rounded-lg"
                  placeholder="Enter Your Phone"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 bg-[#333333] text-white border border-[#444444] rounded-lg"
                  placeholder="Enter Your Address"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                UPDATE
              </button>
            </form>
            <button
              onClick={handleDeleteAccount}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold mt-4"
            >
              DELETE ACCOUNT
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
