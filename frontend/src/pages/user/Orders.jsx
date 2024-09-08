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
      <div className="w-full p-4 bg-[#1A1A1A] text-white min-h-screen">
        <div className="flex gap-4 p-4">
          <div className="w-1/4">
            <UserMenu />
          </div>
          <div className="w-3/4">
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
                  <table className="w-full mb-4 text-left">
                    <thead>
                      <tr>
                        <th className="p-2">#</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Buyer</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Payment</th>
                        <th className="p-2">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2">{i + 1}</td>
                        <td className="p-2">{o?.status}</td>
                        <td className="p-2">{o?.buyer?.name}</td>
                        <td className="p-2">{createdAt}</td>
                        <td className="p-2">
                          {o?.payment.success ? "Success" : "Failed"}
                        </td>
                        <td className="p-2">{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex flex-col">
                    {o?.products?.map((p) => (
                      <div
                        className="flex items-center mb-4 p-3 bg-[#333333] rounded-lg"
                        key={p._id}
                      >
                        <img
                          src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                          className="w-24 h-24 object-cover rounded-lg mr-4"
                          alt={p.name}
                        />
                        <div>
                          <p className="font-semibold">{p.name}</p>
                          <p>{p.description.substring(0, 30)}...</p>
                          <p className="text-red-500">Price: {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
