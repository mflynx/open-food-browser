import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Searchbar.module.scss";

const Searchbar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

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
    <div className={styles.container}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={"search for a product"}
        onKeyDown={handleEnter}
      ></input>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Searchbar;
