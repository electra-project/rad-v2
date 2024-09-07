import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  
  return (
    <Layout>
      <div
        className="container-fluid m-3 p-3 dashboard"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-photo/flat-lay-workstation-with-copy-space-laptop_23-2148430879.jpg')",
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat", 
          height: "100vh",
          zIndex:"1"
        }}
      >

          <div className="col-md-9">
            <div className="card w-75 p-3" style={{ marginTop: "35px", backgroundColor: "black" , color:"white" }}>
              <h3>Admin Name: {auth?.user?.name}</h3>
              <h3>Admin Email: {auth?.user?.email}</h3>
              <h3>Admin Contact: {auth?.user?.phone}</h3>
            </div>
          </div>
          <br/>
          <AdminMenu />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
