import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/orders"
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Your Orders">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-4 bg-[#1A1A1A] text-white">
          <UserMenu />
        </div>
        <div className="md:w-3/4 p-4">
          {orders?.map((o, i) => {
            // Ensure createAt is a valid date
            const createdAt = moment(o.createAt).isValid()
              ? moment(o.createAt).fromNow()
              : "Date unavailable";

            return (
              <div
                className="bg-[#222222] p-4 mb-4 rounded-lg shadow-lg"
                key={o._id}
              >
                <table className="w-full table-auto mb-4 text-left">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-2 py-2">#</th>
                      <th className="px-2 py-2">Status</th>
                      <th className="px-2 py-2">Buyer</th>
                      <th className="px-2 py-2">Date</th>
                      <th className="px-2 py-2">Payment</th>
                      <th className="px-2 py-2">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 py-2">{i + 1}</td>
                      <td className="px-2 py-2">{o?.status}</td>
                      <td className="px-2 py-2">{o?.buyer?.name}</td>
                      <td className="px-2 py-2">{createdAt}</td>
                      <td className="px-2 py-2">
                        {o?.payment.success ? "Success" : "Failed"}
                      </td>
                      <td className="px-2 py-2">{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="space-y-4">
                  {o?.products?.map((p) => (
                    <div
                      className="flex flex-col sm:flex-row mb-4 p-3 bg-[#333333] rounded-lg shadow-md"
                      key={p._id}
                    >
                      <div className="sm:w-1/3 mb-2 sm:mb-0">
                        <img
                          src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                          className="w-full h-auto object-cover rounded-lg"
                          alt={p.name}
                        />
                      </div>
                      <div className="sm:w-2/3 pl-0 sm:pl-4">
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-sm text-gray-600">{p.description.substring(0, 30)}...</p>
                        <p className="font-medium text-red-500">Price: {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
