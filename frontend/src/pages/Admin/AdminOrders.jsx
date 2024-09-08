import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-4">
          <AdminMenu />
        </div>
        <div className="md:w-3/4 p-4">
          <h1 className="text-center text-xl font-semibold mb-4">All Orders</h1>
          {orders?.map((o, i) => (
            <div key={o._id} className="border shadow-md mb-4 p-4">
              <div className="overflow-x-auto">
                <table className="w-full table-auto mb-4">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-2 py-2 text-left">#</th>
                      <th className="px-2 py-2 text-left">Status</th>
                      <th className="px-2 py-2 text-left">Buyer</th>
                      <th className="px-2 py-2 text-left">Date</th>
                      <th className="px-2 py-2 text-left">Payment</th>
                      <th className="px-2 py-2 text-left">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 py-2">{i + 1}</td>
                      <td className="px-2 py-2">
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                          className="w-full"
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td className="px-2 py-2">{o?.buyer?.name}</td>
                      <td className="px-2 py-2">{moment(o?.createAt).fromNow()}</td>
                      <td className="px-2 py-2">{o?.payment.success ? "Success" : "Failed"}</td>
                      <td className="px-2 py-2">{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="space-y-4">
                {o?.products?.map((p) => (
                  <div className="flex flex-col sm:flex-row mb-4 p-3 border rounded shadow-md" key={p._id}>
                    <div className="sm:w-1/3 mb-2 sm:mb-0">
                      <img
                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                        className="w-full h-auto object-cover"
                        alt={p.name}
                      />
                    </div>
                    <div className="sm:w-2/3 pl-0 sm:pl-4">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-gray-600">{p.description.substring(0, 30)}</p>
                      <p className="font-medium">Price: {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;