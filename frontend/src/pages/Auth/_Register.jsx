import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
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
    <Layout title="Register - ELECTRA">
      <div className="form-container" style={{ height:"520px" }}>
        <form onSubmit={handleSubmit} style={{borderRadius:"10px",height:"470px",width:"350px" , marginBottom:"10px"}}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-200"
              style={{width:"300px"}}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
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
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-200"
              style={{width:"300px"}}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-200"
              style={{width:"300px"}}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              id="exampleInputEmail1"
              placeholder="What is Your Favorite sports"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-200"
              style={{width:"300px"}}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{width:"300px" , borderRadius:"5px",marginBottom:"90px"}}>
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
