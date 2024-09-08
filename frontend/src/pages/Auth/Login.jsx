import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import RedirectAuthenticatedUser from "./RedirectAuthenticatedUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-black flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/2 relative overflow-hidden">
        {/* <img
          alt="login background"
          className="absolute inset-0 w-full h-full object-cover object-left-center"
          style={{
            objectPosition: "75% center",
            transform: "scale(1)",
            transformOrigin: "center",
          }}
          src="/images/banner/sn.jpeg"
        /> */}

        <video
          alt="login background"
          className="absolute inset-0 w-full h-full object-cover object-left-center"
          style={{
            objectPosition: "80% center",
            transform: "scale(1)",
            transformOrigin: "center",
          }}
          src="https://www.gigabyte.com/FileUpload/Global/KeyFeature/2172/innergigabyteimages/x670.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute top-8 left-8 text-white">
          <h1 className="text-3xl font-bold md:text-4xl">AMU</h1>
        </div>
        <div className="absolute top-8 right-8">
          <button
            className="text-white bg-gray-700 px-4 py-2 rounded-lg flex items-center"
            onClick={() => navigate("/")}
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to website
          </button>
        </div>
        <div className="absolute bottom-8 left-8 text-white">
          <p className="text-xl font-semibold md:text-2xl">Electra Technologies</p>
        </div>
      </div>
      <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center min-h-screen">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Login to your account
        </h2>
        <p className="text-gray-400 mb-6 text-base md:text-lg">
          Don't have an account?
          <a className="text-blue-400 pl-2" href="/register">
            Sign up
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
              placeholder="Enter Your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-4 relative">
            <input
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
              placeholder="Enter Your Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="fas fa-eye absolute right-3 top-3 text-gray-400"></i>
          </div>
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <input className="mr-2" id="remember" type="checkbox" />
              <label className="text-gray-400" htmlFor="remember">
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-blue-400"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-electra-red text-white p-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>
        {/* <div className="mt-6 text-center text-gray-400">Or login with</div>
        <div className="flex space-x-4 mt-4">
          <button className="w-full bg-gray-700 text-white p-3 rounded-lg flex items-center justify-center">
            <i className="fab fa-google mr-2"></i>
            Google
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default RedirectAuthenticatedUser(Login);
