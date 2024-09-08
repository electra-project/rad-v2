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

  useEffect(() => {
    console.log("Categories in HomePage:", categories);
  }, [categories]);

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

  const getCategoryImageUrl = (categoryId) => {
    return `http://localhost:8080/api/v1/category/category-photo/${categoryId}`;
  };

  return (
    <Layout title={"ELECTRA - Best offers"}>
      <div className="flex flex-col min-h-screen bg-black">
        {/* Header and Banner Section */}
        <div className="relative w-full" style={{ height: "40vh" }}>
          <img
            src="/images/banner/banner6.jpg"
            alt="AORUS AI Gaming Laptop"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Categories Grid Section */}
        <div className="bg-black py-6 md:py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-white">
              Product Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <div
                    className="group relative overflow-hidden rounded-lg"
                    key={category._id}
                  >
                    <Link to={`/category/${category.slug}`}>
                      <div
                        className="h-32 md:h-48 bg-gray-200 flex items-center justify-center"
                        style={{
                          backgroundImage: `url(${getCategoryImageUrl(
                            category._id
                          )})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <h3 className="text-white text-lg md:text-xl font-bold text-center bg-black bg-opacity-50 p-2 rounded">
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
        <div className="bg-black py-6 md:py-12">
          {/* Add your products display logic here */}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
