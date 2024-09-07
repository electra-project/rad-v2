import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();


  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
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
    <Layout title="ELECTRA - LOGIN">
      <div className="form-container " style={{ height:"500px",backgroundImage:"url('https://t3.ftcdn.net/jpg/03/55/60/70/360_F_355607062_zYMS8jaz4SfoykpWz5oViRVKL32IabTP.jpg')"}}>
        <form onSubmit={handleSubmit} style={{borderRadius:"10px",height:"300px"}}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-200"
              style={{width:"300px"}}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-200"
              style={{width:"300px"}}
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn forgot-btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
              style={{width:"300px" , borderRadius:"5px"}}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary" 
          style={{width:"300px" , borderRadius:"5px"}}>
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
