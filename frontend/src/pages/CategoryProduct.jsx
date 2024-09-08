import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Radio, Button, Checkbox } from "antd";
import { Prices } from "../components/Prices";
import Layout from "../components/Layout/Layout";
import Breadcrumbs from "../components/Breadcrumbs";
import { useCart } from "../context/cart"; // Import the cart context
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [radio, setRadio] = useState([]); // Selected price range
  const [filteredProducts, setFilteredProducts] = useState([]); // Products after applying the filter
  const [loading, setLoading] = useState(true); // Loading state
  const [cart, setCart] = useCart(); // Use cart context
  const [showOutOfStock, setShowOutOfStock] = useState(true); // State to show/hide out of stock products

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
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false even if there is an error
    }
  };

  // Apply price filter and out of stock visibility when the radio value or showOutOfStock changes
  useEffect(() => {
    let filtered = products;

    // Apply price filter
    if (radio.length > 0) {
      filtered = filtered.filter(
        (p) => p.price >= radio[0] && p.price <= radio[1]
      );
    }

    // Apply out of stock filter
    if (!showOutOfStock) {
      filtered = filtered.filter((p) => p.quantity > 0);
    }

    setFilteredProducts(filtered);
  }, [radio, products, showOutOfStock]);

  // Handle filter reset
  const resetFilters = () => {
    setRadio([]); // Clear the selected price range
    setShowOutOfStock(true); // Show all products including out of stock
    setFilteredProducts(products); // Reset the product list
  };

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    if (product) {
      setCart([...cart, product]);
      localStorage.setItem("cart", JSON.stringify([...cart, product]));
      toast.success("Item Added to Cart");
    } else {
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        <p className="mt-4 text-white text-xl font-semibold">
          Loading Products...
        </p>
      </div>
    </div>
  );

  return (
    <Layout>
      {loading && <LoadingScreen />}
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
              <h3 className="text-lg sm:text-xl font-bold mb-4">
                Filter By Price
              </h3>
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
              <Checkbox
                className="text-white mt-4"
                checked={showOutOfStock}
                onChange={(e) => setShowOutOfStock(e.target.checked)}
              >
                Show Out of Stock Products
              </Checkbox>
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
                className="bg-[#161616] rounded-lg overflow-hidden relative flex flex-col"
              >
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="w-full h-48 sm:h-64 object-cover" // Ensure a responsive size
                  alt={p.name}
                />
                {p.quantity === 0 && (
                  <div className="absolute top-0 left-0 bg-red-600 text-white text-s font-bold px-2 py-1">
                    OUT OF STOCK
                  </div>
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-2 truncate">{p.name}</h3>
                  <p className="text-red-500 font-bold mb-4">
                    රු. {p.price.toLocaleString()}
                  </p>
                  <div className="flex flex-col gap-2 mt-auto">
                    <Button
                      type="primary"
                      style={{
                        backgroundColor:
                          p.quantity === 0 ? "#ef4444" : "#3b82f6",
                        borderColor: p.quantity === 0 ? "#ef4444" : "#3b82f6",
                      }}
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (p.quantity > 0) {
                          handleAddToCart(p);
                        }
                      }}
                      disabled={p.quantity === 0}
                    >
                      {p.quantity === 0 ? "Cannot Add to Cart" : "Add to Cart"}
                    </Button>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor:
                          p.quantity === 0 ? "#ef4444" : "#3b82f6",
                        borderColor: p.quantity === 0 ? "#ef4444" : "#3b82f6",
                      }}
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (p.quantity > 0) {
                          navigate(`/product/${p.slug}`);
                        }
                      }}
                      disabled={p.quantity === 0}
                    >
                      More Details
                    </Button>
                  </div>
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
