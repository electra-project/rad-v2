import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard - All Products"}>
      <div className="w-full p-6 bg-[#1A1A1A] text-white min-h-screen">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              ALL PRODUCTS
            </h1>
            <div className="flex flex-wrap gap-4">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                >
                  <div className="bg-[#222222] border border-gray-700 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      className="w-full h-48 object-cover"
                      alt={p.name}
                    />
                    <div className="p-4">
                      <h5 className="text-lg md:text-xl font-bold mb-2">{p.name}</h5>
                      <p className="text-gray-300 text-sm md:text-base">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
