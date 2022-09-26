import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "./../api/apiHandler";
import SearchBar from "./../components/Searchbar";
import Header from "../components/Header";

import noImage from "./../images/image-not-available.png";
import homeIcon from "./../images/Home_icon_orange.png";
import styles from "./ResultsView.module.scss";

const ResultsView = () => {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const getProducts = async (searchTerm) => {
    setIsLoading(true);
    const data = await api.searchFood(searchTerm);
    console.log("data :>> ", data);
    // filter out results with no ID or no name
    const products = data.products.filter(
      (p) => p.product_name !== undefined && p.id !== undefined
    );
    setProductsList(products);
    setIsLoading(false);
  };

  const getImageUrl = (product) => {
    return product.image_front_small_url || noImage;
  };

  useEffect(() => {
    getProducts(params.searchTerm);
  }, [params.searchTerm]);

  return (
    <>
      <Header>
        <div className={styles.headerContainer}>
          <img
            src={homeIcon}
            alt="home"
            className="home-icon"
            onClick={() => navigate("/")}
          />
          <SearchBar />
        </div>
      </Header>

      {isLoading && <div className="info-message">Loading . . . </div>}
      {!isLoading && productsList.length === 0 && (
        <div className="info-message">There is no match for your search.</div>
      )}
      {!isLoading && productsList.length > 0 && (
        <>
          <h3>Results for "<i>{params.searchTerm}</i>"</h3>
          <div className={styles.listContainer}>
            {productsList.map((product) => (
              <div
                className={styles.productCard}
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className={styles.imgWrapper}>
                  <img src={getImageUrl(product)} alt={product.product_name} />
                </div>
                <p>{product.product_name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ResultsView;
