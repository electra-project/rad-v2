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
  // const [categories, setCategories] = useState([]);
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

  //get products
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

  //getTOtal COunt
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
  //load more
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

  // filter by cat
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

  //get filterd product
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
          {/* <div className="absolute bottom-8 left-8 text-white text-shadow">
            <h1 className="text-4xl font-bold mb-2">Re: Defyne</h1>
            <h2 className="text-3xl mb-2">AORUS 16X (2024)</h2>
            <p className="text-xl">AORUS AI Gaming Laptop</p>
          </div> */}
        </div>

        {/* Categories Grid Section */}
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8">
              Product Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <Link
                    to={`/category/${category.slug}`}
                    key={category._id}
                    className="group relative overflow-hidden rounded-lg"
                  >
                    {category.image ? (
                      <img
                        src={category.image}
                        // alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300 z-10"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">{category.name}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 flex items-center justify-center transition duration-300">
                      <h3 className="text-white text-xl font-bold text-center">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No categories available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
