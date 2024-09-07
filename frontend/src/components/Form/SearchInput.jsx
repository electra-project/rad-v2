// SearchInput.js
import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
      setSearchTerm(""); // Clear the input after search
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex-grow" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full bg-black text-white px-4 py-2 text-sm rounded-l-md focus:outline-none focus:border-gray-500"
        placeholder="Search for products"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setValues({ ...values, keyword: e.target.value });
        }}
      />
    </form>
  );
};

export default SearchInput;
