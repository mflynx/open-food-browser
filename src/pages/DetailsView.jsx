import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "./../api/apiHandler";

const DetailsView = () => {
  const [productDetails, setProductDetails] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const getProduct = async (id) => {
    const data = await api.getDetails(id);
    console.log("data :>> ", data);
    setProductDetails(data.product);
  };

  useEffect(() => {
    getProduct(params.id);
  }, [params.id]);

  if (!productDetails) return;
  return (
    <>
      <Link to="/">Home</Link>
      <button onClick={() => navigate(-1)}>Back to results</button>
      <div>DetailsView</div>
      <div>{productDetails.product_name}</div>
      <img
        src={productDetails.image_front_url}
        alt={productDetails.product_name}
      />
      <div>{productDetails.categories}</div>
      <div>{productDetails.allergens_hierarchy}</div>
      <div>{productDetails.ingredients_text}</div>
    </>
  );
};

export default DetailsView;
