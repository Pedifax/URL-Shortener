import React from "react";
import { NavLink } from "react-router-dom";

const Title = () => {
  return (
    <h1 className="rounded-lg border border-cyan-200 text-center text-7xl font-bold italic shadow-lg shadow-cyan-200 lg:text-9xl">
      <NavLink to="/">{"Napoleon"}</NavLink>
    </h1>
  );
};

export default Title;
