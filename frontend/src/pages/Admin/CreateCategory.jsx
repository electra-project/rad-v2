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
      toast.error("Something went wrong in getting categories 1");
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
      toast.error("Something went wrong while creating category 2");
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
      toast.error("Something went wrong while updating category 3");
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
      toast.error("Something went wrong while deleting category 4");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Categories</h1>
            <div className="m-1 w-75">
              <CategoryForm
                handleSubmit={handleCreate}
                name={name}
                setName={setName}
                photo={photo}
                setPhoto={setPhoto}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
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
                          className="btn btn-danger ms-2"
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
