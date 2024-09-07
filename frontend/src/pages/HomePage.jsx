import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import useCategory from "../hooks/useCategory";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const categories = useCategory();

  // Console log to check categories
  useEffect(() => {
    console.log("Categories in HomePage:", categories);
  }, [categories]);

  // Get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Helper function to get the category image URL
  const getCategoryImageUrl = (categoryId) => {
    return `http://localhost:8080/api/v1/category/category-photo/${categoryId}`;
  };

  return (
    <Layout title={"ELECTRA - Best offers "}>
      <div className="flex flex-col min-h-screen bg-black">
        {/* Header and Banner Section */}
        <div className="relative" style={{ height: "calc(100vh - 88px)" }}>
          <img
            src="/images/banner/banner1.jpg"
            alt="AORUS AI Gaming Laptop"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Categories Grid Section */}
        <div className="bg-black py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8 text-white">
              Product Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <div
                    className="group relative overflow-hidden rounded-lg"
                    key={category._id}
                  >
                    <Link to={`/category/${category.slug}`}>
                      <div
                        className="h-48 bg-gray-200 flex items-center justify-center"
                        style={{
                          backgroundImage: `url(${getCategoryImageUrl(
                            category._id
                          )})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          minHeight: "250px",
                        }}
                      >
                        <h3 className="text-white text-xl font-bold text-center bg-black bg-opacity-50 p-2 rounded">
                          {category.name}
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No categories available
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-black py-12">
          {/* Add your products display logic here */}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
