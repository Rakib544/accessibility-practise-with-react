import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1 className="title">My all accessible components list link:</h1>
      <div>
        <Link className="link" to="/accordion">
          Accordion
        </Link>
      </div>
    </div>
  );
};

export default Home;
