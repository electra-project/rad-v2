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
      <div className="bg-[#1A1A1A] py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                className="relative bg-cover bg-center bg-no-repeat text-center text-white"
                style={{
                  backgroundImage: `url(${getCategoryImageUrl(
                    category._id
                  )})`,
                  minHeight: "250px",
                }}
                key={category._id}
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
                >
                  <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">{category.name}</h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
