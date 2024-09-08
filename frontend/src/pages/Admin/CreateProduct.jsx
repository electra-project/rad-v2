import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const categories = useCategory(); // Use the hook
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="w-full p-6 bg-[#1A1A1A] text-white min-h-screen">
        <div className="flex gap-6">
          <div className="w-1/4">
            <AdminMenu />
          </div>
          <div className="w-3/4">
            <h1 className="text-2xl font-bold mb-6">Create Product</h1>
            <div className="bg-[#222222] p-6 rounded-lg shadow-lg">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="w-full mb-4 bg-[#333333] text-white"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))
                ) : (
                  <Option disabled>No categories available</Option>
                )}
              </Select>

              <div className="mb-4">
                <label className="btn btn-outline-secondary w-full bg-[#444444] text-white">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              {photo && (
                <div className="mb-4 text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive mx-auto"
                  />
                </div>
              )}
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  className="form-control bg-[#333333] text-white placeholder-gray-400 border border-gray-700"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={description}
                  placeholder="Product Description"
                  className="form-control bg-[#333333] text-white placeholder-gray-400 border border-gray-700"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={price}
                  placeholder="Price"
                  className="form-control bg-[#333333] text-white placeholder-gray-400 border border-gray-700"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Quantity"
                  className="form-control bg-[#333333] text-white placeholder-gray-400 border border-gray-700"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="w-full bg-[#333333] text-white"
                  onChange={(value) => setShipping(value)}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <button
                className="btn btn-primary w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={handleCreate}
              >
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
