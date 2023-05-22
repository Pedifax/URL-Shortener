import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactGA from "react-ga";

import MainPage from "./main/pages/MainPage";

ReactGA.initialize("G-39XE48ZRFW");

const App = () => {
  
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  let routes = (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  );

  return <Router>{routes}</Router>;
};

export default App;
