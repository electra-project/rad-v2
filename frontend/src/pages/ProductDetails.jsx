import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
import toast from "react-hot-toast";
import Breadcrumbs from "../components/Breadcrumbs";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // Set initial state to null
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(true); // Track loading state
  const [imageLoading, setImageLoading] = useState(true); // Track image loading

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      setCart([...cart, product]);
      localStorage.setItem("cart", JSON.stringify([...cart, product]));
      toast.success("Item Added to Cart");
    } else {
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false); // Image loaded successfully
  };

  const handleImageError = () => {
    setImageLoading(false); // Image failed to load
  };

  if (loading) return <div>Loading...</div>; // Show loading state

  return (
    <Layout title={`Product Details - ${product?.name || "Loading..."}`}>
      <div className="w-full p-4 bg-[#1A1A1A] text-white min-h-screen">
        <Breadcrumbs categoryName={product?.category?.name} />
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/2 bg-[#222222] p-4 rounded-lg flex justify-center items-center">
            {imageLoading && <div>Loading image...</div>}
            <img
              src={`http://localhost:8080/api/v1/product/product-photo/${product?._id}`}
              className="w-3/4 h-auto object-cover rounded-lg"
              alt={product?.name || "Product image"}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ display: imageLoading ? "none" : "block" }}
            />
          </div>

          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">
              {product?.name || "Loading..."}
            </h1>
            <p className="text-3xl font-bold text-red-500 mb-4">
              {product?.price
                ? `රු. ${product.price.toLocaleString()}`
                : "Loading..."}
            </p>
            <div className="bg-[#222222] p-4 rounded-lg mb-4">
              <p className="mb-2">
                {product?.description || "Loading description..."}
              </p>
              <p className="mb-2">
                Category: {product?.category?.name || "Loading..."}
              </p>
            </div>
            <Button
              type="primary"
              className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-semibold"
              onClick={handleAddToCart}
              disabled={!product} // Disable button if product is not loaded
            >
              ADD TO CART
            </Button>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4">Similar Products</h2>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {relatedProducts?.map((p) => (
            <div
              key={p._id}
              className="bg-[#222222] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg"
              onClick={() => navigate(`/product/${p.slug}`)}
            >
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                className="w-full h-64 object-cover"
                alt={p.name}
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                <p className="text-sm mb-2">
                  {p.description.substring(0, 60)}...
                </p>
                <p className="text-red-500 font-bold mb-2">
                  රු. {p.price.toLocaleString()}
                </p>
                <Button
                  type="primary"
                  className="w-full bg-gray-500 hover:bg-gray-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${p.slug}`);
                  }}
                >
                  More Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
