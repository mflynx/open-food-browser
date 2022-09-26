import React from "react";

import Header from "../components/Header";
import SearchBar from "./../components/Searchbar";

import offLogo from "./../images/off-logo-horizontal-light.svg";
import funnyFruits from "./../images/funny-fruits.png";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <>
      <Header>
        <div className={styles.headerContainer}>
          <h1>Food Browser</h1>
          <h2>based on</h2>
          <img src={offLogo} alt="Open Food Facts" />
        </div>
      </Header>
      <div className={styles.mainContainer}>
        <SearchBar />
        <img src={funnyFruits} alt="funny fruits" />
      </div>
    </>
  );
};

export default Home;
