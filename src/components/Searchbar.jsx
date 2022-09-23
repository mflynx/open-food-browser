import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Searchbar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const placeholder = params.searchTerm || "search for a product";

  const handleSearch = () => {
    if (input) {
      navigate(`/search/${input}`);
    }
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleEnter}
      ></input>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Searchbar;
