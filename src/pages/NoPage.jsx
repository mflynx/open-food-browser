import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import homeIcon from "./../images/Home_icon_orange.png";

const NoPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <img
          src={homeIcon}
          alt="home"
          className="home-icon"
          onClick={() => navigate("/")}
        />
      </Header>
      <div className="info-message">
        Oups... You got lost ! This page does not exist. Go back{" "}
        <span className="redirect" onClick={() => navigate("/")}>
          home
        </span>{" "}
        to search for food !
      </div>
    </>
  );
};

export default NoPage;
