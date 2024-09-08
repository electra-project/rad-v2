import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Category = () => {
  const categories = useCategory();

  // Helper function to get the category image URL
  const getCategoryImageUrl = (categoryId) => {
    return `http://localhost:8080/api/v1/category/category-photo/${categoryId}`;
  };

  return (
    <Layout title={"All Categories"}>
      <div className="bg-[#1A1A1A]">
        <div className="container bg-[#1A1A1A] mt-100">
          <div className="row container">
            {categories.map((category) => (
              <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={category._id}>
                <div
                  className="card h-100 text-center text-white"
                  style={{
                    backgroundImage: `url(${getCategoryImageUrl(
                      category._id
                    )})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minHeight: "250px",
                  }}
                >
                  <Link
                    to={`/category/${category.slug}`}
                    className="btn cat-btn h-100 flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <h2 className="text-white">{category.name}</h2>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
