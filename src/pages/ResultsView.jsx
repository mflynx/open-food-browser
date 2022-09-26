import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "./../api/apiHandler";
import SearchBar from "./../components/Searchbar";
import Header from "../components/Header";

import noImage from "./../images/image-not-available.png";
import homeIcon from "./../images/Home_icon_orange.png";
import chevronLeft from "./../images/chevron-icon-left.png";
import chevronRight from "./../images/chevron-icon-right.png";
import styles from "./ResultsView.module.scss";

const ResultsView = () => {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  const getProducts = async (searchTerm, page) => {
    setIsLoading(true);
    const data = await api.searchFood(searchTerm, page);
    console.log("data :>> ", data);
    // filter out results with no ID or no name
    const products = data.products.filter(
      (p) => p.product_name !== undefined && p.id !== undefined
    );
    setProductsList(products);
    setTotalPages(Math.ceil(data.count / data.page_size));
    setIsLoading(false);
  };

  const getImageUrl = (product) => {
    return product.image_front_small_url || noImage;
  };

  const currentPage = Number(params.page);

  const handleChangePage = (direction) => {
    const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    navigate(`/search/${params.searchTerm}/page=${newPage}`);
  };

  useEffect(() => {
    getProducts(params.searchTerm, params.page);
  }, [params.searchTerm, params.page]);

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
          <h3>
            Results for "<i>{params.searchTerm}</i>"
          </h3>
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
          <div className={styles.pagination}>
            {currentPage > 1 && (
              <img
                onClick={() => handleChangePage("previous")}
                src={chevronLeft}
                alt="previous page"
              />
            )}
            <p>
              Page {currentPage} of {totalPages}
            </p>
            {totalPages > currentPage && (
              <img
                onClick={() => handleChangePage("next")}
                src={chevronRight}
                alt="next page"
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ResultsView;
