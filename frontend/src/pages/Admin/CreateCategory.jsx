import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import CategoryForm from "../../components/Form/CategoryForm"; // Assuming this is your form component

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPhoto, setUpdatedPhoto] = useState(null);

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.categories); // Adjust according to your API response
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle category creation
  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (photo) {
      formData.append("photo", photo);
    }
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        setName("");
        setPhoto(null); // Clear the file input
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating category");
    }
  };

  // Handle category update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", updatedName);
    if (updatedPhoto) {
      formData.append("photo", updatedPhoto);
    }
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setVisible(false);
        setUpdatedName("");
        setUpdatedPhoto(null); // Clear the file input
        setSelected(null);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating category");
    }
  };

  // Handle category deletion
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success("Category is deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting category");
    }
  };

  return (
    <Layout title={"Dashboard - Category"}>
      <div className="w-full p-6 bg-[#1A1A1A] text-white min-h-screen">
        <div className="flex gap-6 p-4">
          <div className="w-1/4">
            <AdminMenu />
          </div>
          <div className="w-3/4">
            <div className="bg-[#222222] p-6 rounded-lg mb-6 shadow-lg">
              <CategoryForm
                handleSubmit={handleCreate}
                name={name}
                setName={setName}
                photo={photo}
                setPhoto={setPhoto}
              />
            </div>
            <div className="bg-[#222222] p-6 rounded-lg shadow-lg">
              <table className="w-full text-left border border-gray-700 rounded-md">
                <thead className="bg-gray-850">
                  <tr>
                    <th className="p-3 text-gray-300">Name</th>
                    <th className="p-3 text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id} className="border-b border-gray-600">
                      <td className="p-3">{c.name}</td>
                      <td className="p-3 flex gap-2">
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setUpdatedPhoto(null); // Clear the file input
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                handleSubmit={handleUpdate}
                name={updatedName}
                setName={setUpdatedName}
                photo={updatedPhoto}
                setPhoto={setUpdatedPhoto}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
