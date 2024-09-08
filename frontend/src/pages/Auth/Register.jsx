import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import RedirectAuthenticatedUser from "./RedirectAuthenticatedUser";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        data
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-black flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/2 relative overflow-hidden">
        <img
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
          src="https://www.aorus.com/event/event/q123-amd-gamebundle/assets/images/Feature2-bg.jpg"
        />
        <div className="absolute top-8 left-8 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">AMU</h1>
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
          <p className="text-lg md:text-xl font-semibold">Electra Technologies</p>
        </div>
      </div>
      <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center min-h-screen">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Create an account
        </h2>
        <p className="text-gray-400 mb-6">
          Already have an account?
          <a className="text-blue-400 pl-2" href="/login">
            Log in
          </a>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
              placeholder="Enter Your Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <input
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
                placeholder="Enter Your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="w-full md:w-1/2 relative">
              <input
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
                placeholder="Enter Your Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
              <i className="fas fa-eye absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>
          <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <input
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
                placeholder="Enter Your Phone"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <input
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
                placeholder="Enter Your Address"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className="text-red-500 mt-1">{errors.address.message}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
              placeholder="What is your favorite sport?"
              {...register("answer", {
                required: "Security answer is required",
              })}
            />
            {errors.answer && (
              <p className="text-red-500 mt-1">{errors.answer.message}</p>
            )}
          </div>
          <div className="mb-6 flex items-center">
            <input
              className="mr-2"
              id="terms"
              type="checkbox"
              {...register("terms", {
                required: "You must agree to the Terms & Conditions",
              })}
            />
            <label className="text-gray-400" htmlFor="terms">
              I agree to the
              <a className="text-blue-400 ml-1" href="#">
                Terms &amp; Conditions
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 mt-1 mb-4">{errors.terms.message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-electra-red text-white p-3 rounded-lg font-semibold"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RedirectAuthenticatedUser(Register);
