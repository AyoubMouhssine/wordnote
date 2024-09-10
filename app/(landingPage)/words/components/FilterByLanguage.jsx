"use client";
import React, { useState } from "react";

const FilterByLanguage = ({ languages, handleFilter }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleChange = (lang) => {
    setSelectedLanguage(lang);
    handleFilter(lang);
  };

  return (
    <form className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Filter By Language:</h3>
      <div className="mb-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="language"
            value=""
            className="form-radio text-blue-600"
            onChange={(e) => handleChange(e.target.value)}
            checked={selectedLanguage === ""}
          />
          <span>All</span>
        </label>
      </div>
      {languages.map(({ short, language }) => (
        <div key={short} className="mb-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="language"
              value={short}
              className="form-radio text-blue-600"
              onChange={(e) => handleChange(e.target.value)}
              checked={selectedLanguage === short}
            />
            <span>{language}</span>
          </label>
        </div>
      ))}
    </form>
  );
};

export default FilterByLanguage;
