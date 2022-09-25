import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SearchBar from "./../components/Searchbar";
import Header from "../components/Header";
import api from "./../api/apiHandler";
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
    setProductsList(data.products);
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts(params.searchTerm);
  }, [params.searchTerm]);

  return (
    <>
      <Header>
        <div className={styles.headerContainer}>
          <Link to="/">Home</Link>
          <SearchBar />
        </div>
      </Header>

      {isLoading && <div>Loading . . . </div>}
      {!isLoading && productsList.length === 0 && (
        <div>There is no match for your search.</div>
      )}
      {!isLoading && productsList.length > 0 && (
        <div className={styles.listContainer}>
          {productsList.map((product) => (
            <div
              className={styles.productCard}
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className={styles.imgWrapper}>
                <img
                  src={product.image_front_small_url}
                  alt={product.product_name}
                />
              </div>
              <p>{product.product_name}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ResultsView;
