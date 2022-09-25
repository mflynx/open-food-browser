import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "./../api/apiHandler";
import Header from "./../components/Header";
import styles from "./DetailsView.module.scss";

const DetailsView = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const getProduct = async (id) => {
    setIsLoading(true);
    const data = await api.getDetails(id);
    console.log("data :>> ", data);
    setProductDetails(data.product);
    setIsLoading(false);
  };

  const allergensNicer =
    productDetails?.allergens_hierarchy
      ?.map((e) => e.replace("en:", ""))
      .join(" | ") || "";
  const categoriesNicer =
    productDetails?.categories?.replaceAll(",", ", ") || "";

  useEffect(() => {
    getProduct(params.id);
  }, [params.id]);

  return (
    <>
      <Header>
        <Link to="/">Home</Link>
        <button onClick={() => navigate(-1)}>Back to results</button>
      </Header>
      {isLoading && <div>Loading . . . </div>}
      {productDetails && (
        <div className={styles.productContainer}>
          <h2>{productDetails.product_name}</h2>
          {categoriesNicer && <p>Categories: {categoriesNicer}</p>}
          <img
            src={productDetails.image_front_url}
            alt={productDetails.product_name}
          />
          {allergensNicer && <p>Allergens: {allergensNicer}</p>}
          {productDetails.ingredients_text && (
            <p>Ingredients: {productDetails.ingredients_text}</p>
          )}
        </div>
      )}
    </>
  );
};

export default DetailsView;
