import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1 className="text-3xl text-center font-medium">
        My all accessible components list link:
      </h1>
      <div>
        <Link
          className="text-sky-500 text-xl underline my-2 block"
          to="/accordion"
        >
          Accordion
        </Link>
        <Link
          className="text-sky-500 text-xl underline my-2 block"
          to="/select"
        >
          select
        </Link>
        <Link
          className="text-sky-500 text-xl underline my-2 block"
          to="/navbar"
        >
          Navbar
        </Link>
        <Link
          className="text-sky-500 text-xl underline my-2 block"
          to="/practice-navbar"
        >
          Practice Navbar
        </Link>
      </div>
    </div>
  );
};

export default Home;
