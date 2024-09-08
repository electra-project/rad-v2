import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Radio, Button } from "antd";
import { Prices } from "../components/Prices";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import Breadcrumbs from "../components/Breadcrumbs";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [radio, setRadio] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (values?.results) {
      setFilteredResults(values.results);
    }
  }, [values?.results]);

  useEffect(() => {
    if (radio.length > 0) {
      const filtered = values?.results.filter(
        (p) => p.price >= radio[0] && p.price <= radio[1]
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults(values?.results);
    }
  }, [radio, values?.results]);

  const resetFilters = () => {
    setRadio([]);
    setFilteredResults(values?.results);
  };

  return (
    <Layout title={"Search results"}>
      <div className="w-full p-4 bg-[#1A1A1A] text-white min-h-screen">
        <Breadcrumbs />
        <h1 className="text-center text-6xl font-bold mb-2 mt-16">
          Search Results
        </h1>
        <h2 className="text-center text-xl mb-6">
          {filteredResults?.length < 1
            ? "No Products Found"
            : `${filteredResults?.length} results found`}
        </h2>
        <div className="flex gap-6">
          {/* Filter section */}
          <div className="w-1/5 border-r border-gray-700 pr-4">
            <div className="bg-[#161616] p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Filter By Price</h3>
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
                onClick={resetFilters}
                style={{ background: "#ef4444", borderColor: "#ef4444" }}
              >
                RESET FILTERS
              </Button>
            </div>
          </div>

          {/* Products section */}
          <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 justify-center">
            {filteredResults?.map((p) => (
              <div
                key={p._id}
                className="bg-[#161616] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg max-w-xs mx-auto"
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="w-64 h-64 object-cover mx-auto"
                  style={{
                    width: "250px",
                    height: "250px",
                    objectFit: "cover",
                  }}
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

export default Search;
