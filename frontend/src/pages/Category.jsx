import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Category = () => {
  const categories = useCategory();
  const [loading, setLoading] = useState(true);

  // Helper function to get the category image URL
  const getCategoryImageUrl = (categoryId) => {
    return `http://localhost:8080/api/v1/category/category-photo/${categoryId}`;
  };

  useEffect(() => {
    if (categories.length > 0) {
      const imagePromises = categories.map((category) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = getCategoryImageUrl(category._id);
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(imagePromises)
        .then(() => setLoading(false))
        .catch(() => setLoading(false)); // Set loading to false even if some images fail to load
    }
  }, [categories]);

  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        <p className="mt-4 text-white text-xl font-semibold">
          Loading Categories...
        </p>
      </div>
    </div>
  );

  return (
    <Layout title={"All Categories"}>
      {loading && <LoadingScreen />}
      <div className="bg-[#1A1A1A] py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                className="relative bg-cover bg-center bg-no-repeat text-center text-white"
                style={{
                  backgroundImage: `url(${getCategoryImageUrl(category._id)})`,
                  minHeight: "250px",
                }}
                key={category._id}
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-60 transition duration-300"
                >
                  <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">
                    {category.name}
                  </h2>
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
