import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex items-center w-11/12 mx-auto my-4">
      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-12 bg-superLgrey rounded-l-full px-4 text-sm"
        placeholder="Search for properties by location..."
      />
      {/* Submit Button */}
      <button
        onClick={handleSearch}
        className="h-12 bg-black text-white px-6 rounded-r-full"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
