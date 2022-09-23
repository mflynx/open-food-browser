import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SearchBar from "./../components/Searchbar";
import api from "./../api/apiHandler";

const ResultsView = () => {
  const params = useParams();
  const [productsList, setProductsList] = useState([]);

  const getProducts = async (searchTerm) => {
    const data = await api.searchFood(searchTerm);
    console.log("data :>> ", data);
    setProductsList(data.products);
  };

  useEffect(() => {
    getProducts(params.searchTerm);
  }, [params.searchTerm]);

  return (
    <>
      <div>ResultsView</div>
      <SearchBar />
      <div>Result list :</div>
      {productsList.map(product=>
        <div key={product.id}>
            <Link to={`/product/${product.id}`}>
            <h3>{product.product_name}</h3>
            <img src={product.image_front_small_url} alt={product.product_name}/>
            </Link>
        </div>)}
    </>
  );
};

export default ResultsView;
