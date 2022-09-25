import React from "react";

import Header from "../components/Header";
import SearchBar from "./../components/Searchbar";

import styles from "./Home.module.scss";

const Home = () => {
  return (
    <>
      <Header>
        <div className={styles.headerContainer}>
          <h1>Food Browser</h1>
            <h2>based on</h2>
            <img
              src="images/off-logo-horizontal-light.svg"
              alt="Open Food Facts"
            />
        </div>
      </Header>
      <div className={styles.mainContainer}>
      <SearchBar />
      </div>
    </>
  );
};

export default Home;
