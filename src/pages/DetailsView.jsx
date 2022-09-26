import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "./../api/apiHandler";
import Header from "./../components/Header";

import noImage from "./../images/image-not-available.png";
import homeIcon from "./../images/Home_icon_orange.png";
import arrowBack from "./../images/arrow-back.png";
import styles from "./DetailsView.module.scss";

const DetailsView = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const getProduct = async (id) => {
    setIsLoading(true);
    const data = await api.getDetails(id);
    // id is invalid, no product found
    if (data.status === 0) {
      setProductDetails(undefined);
      // product found but has no name
    } else if (!data.product.product_name) {
      setProductDetails(undefined);
      // product found, to be displayed
    } else {
      setProductDetails(data.product);
    }
    setIsLoading(false);
  };

  const getNicerCategories = (product) => {
    return product.categories.replaceAll(",", ", ");
  };

  const getNicerAllergens = (product) => {
    let langCodes = ["en:", "fr:", "de:", "es:"];
    let nicerAllergens = product.allergens_hierarchy;
    langCodes.forEach(
      (code) =>
        (nicerAllergens = nicerAllergens.map((allergen) =>
          allergen.replace(code, "")
        ))
    );
    return nicerAllergens.join(" | ");
  };

  const getImage = (product) => {
    return product.image_front_url || noImage;
  };

  useEffect(() => {
    getProduct(params.id);
  }, [params.id]);

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
          <img
            src={arrowBack}
            alt="Go back"
            className={styles.arrowBack}
            onClick={() => navigate(-1)}
          />
        </div>
      </Header>
      {isLoading && <div className="info-message">Loading . . . </div>}
      {productDetails === undefined && (
        <div className="info-message">
          The product was not found in the database, please try a{" "}
          <span className="redirect" onClick={() => navigate("/")}>
            new search
          </span>
        </div>
      )}
      {productDetails && (
        <div className={styles.productContainer}>
          <h2>{productDetails.product_name}</h2>
          {productDetails.categories && (
            <p>Categories: {getNicerCategories(productDetails)}</p>
          )}
          <img
            src={getImage(productDetails)}
            alt={productDetails.product_name}
          />
          {productDetails.allergens_hierarchy.length > 0 && (
            <p>Allergens: {getNicerAllergens(productDetails)}</p>
          )}
          {productDetails.ingredients_text && (
            <p>Ingredients: {productDetails.ingredients_text}</p>
          )}
        </div>
      )}
    </>
  );
};

export default DetailsView;
