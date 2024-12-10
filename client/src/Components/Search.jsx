import React,{useState} from "react";
import searhIcon from "../assets/Search.svg"

const Search = ({ onSearch, filters }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");

    const handleSearch = () => {
        onSearch(searchTerm, selectedFilter); // Call parent function with search term and filter
    };

    return (
        <div className="flex items-center w-3/6 mx-auto my-20">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 bg-superLgrey rounded-l-full px-4 text-sm"
                placeholder="Search for properties by location..."
            />
            <button
                onClick={handleSearch}
                className="h-12 bg-black text-white px-6 rounded-r-full"
            >
                <img src={searhIcon} alt="search" />
            </button>
            <select
                value={selectedFilter}
                onChange={(e) => {
                    setSelectedFilter(e.target.value);
                    handleSearch(); // Trigger search on filter change
                }}
                className="ml-4 h-12 px-4 rounded bg-superLgrey"
            >
                {filters.map((filter, index) => (
                    <option key={index} value={filter}>
                        {filter}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Search