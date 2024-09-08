import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useCategory from "../../hooks/useCategory";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const categories = useCategory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  // Get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  // Update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Product Update Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Delete product function
  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Update Product</h1>
            <div className="space-y-6">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="w-full mb-4"
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
                <label className="block text-center bg-gray-800 p-4 rounded-lg cursor-pointer">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
                <div className="text-center mt-4">
                  {photo ? (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      className="mx-auto h-48 object-cover"
                    />
                  ) : (
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      className="mx-auto h-48 object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <textarea
                  value={description}
                  placeholder="Product Description"
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="number"
                  value={price}
                  placeholder="Product Price"
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Product Quantity"
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="w-full"
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "yes" : "no"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              <div className="flex gap-4">
                <button
                  className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={handleUpdate}
                >
                  Update Product
                </button>
                <button
                  className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-lg"
                  onClick={handleDelete}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
