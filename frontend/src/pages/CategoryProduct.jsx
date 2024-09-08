import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Radio, Button } from "antd";
import { Prices } from "../components/Prices";
import Layout from "../components/Layout/Layout";
import Breadcrumbs from "../components/Breadcrumbs";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [radio, setRadio] = useState([]); // Selected price range
  const [filteredProducts, setFilteredProducts] = useState([]); // Products after applying the filter

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  // Fetch products by category
  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      setFilteredProducts(data?.products); // Set initial filtered products to all products
    } catch (error) {
      console.log(error);
    }
  };

  // Apply price filter when the radio value changes
  useEffect(() => {
    if (radio.length > 0) {
      const filtered = products.filter(
        (p) => p.price >= radio[0] && p.price <= radio[1]
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Show all products if no filter is applied
    }
  }, [radio, products]);

  // Handle filter reset
  const resetFilters = () => {
    setRadio([]); // Clear the selected price range
    setFilteredProducts(products); // Reset the product list
  };

  return (
    <Layout>
      <div className="w-full p-4 bg-[#1A1A1A] text-white min-h-screen">
        <Breadcrumbs categoryName={category?.name} />
        <h1 className="text-center text-4xl sm:text-6xl font-bold mb-2 mt-16">
          {category?.name?.toUpperCase()}
        </h1>
        <h2 className="text-center text-lg sm:text-xl mb-6">
          {filteredProducts?.length} results found
        </h2>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter section */}
          <div className="lg:w-1/5 border-b lg:border-r border-gray-700 pb-4 lg:pb-0 lg:pr-4">
            <div className="bg-[#161616] p-4 rounded-lg">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Filter By Price</h3>
              <Radio.Group
                onChange={(e) => setRadio(e.target.value)}
                className="flex flex-col gap-2"
                value={radio}
              >
                {Prices?.map((p) => (
                  <Radio key={p._id} value={p.array} className="text-white">
                    {p.name}
                  </Radio>
                ))}
              </Radio.Group>
              <Button
                type="primary"
                danger
                className="w-full mt-6"
                onClick={resetFilters} // Reset filters on button click
                style={{ background: "#ef4444", borderColor: "#ef4444" }}
              >
                RESET FILTERS
              </Button>
            </div>
          </div>

          {/* Products section */}
          <div className="lg:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts?.map((p) => (
              <div
                key={p._id}
                className="bg-[#161616] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg"
                onClick={() => navigate(`/product/${p.slug}`)} // Making the entire card clickable
              >
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="w-full h-48 sm:h-64 object-cover" // Ensure a responsive size
                  alt={p.name}
                />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                  <p className="text-sm">{p.description.substring(0, 60)}...</p>
                  <p className="text-red-500 font-bold mb-4">
                    රු. {p.price.toLocaleString()}
                  </p>
                  <Button
                    type="primary"
                    className="w-full bg-gray-500"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
