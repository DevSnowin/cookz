import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import useScroll from "./hooks/useScroll.hook";

import Home from "./pages/Home.page";
import Cuisine from "./pages/Cuisine.page";
import Header from "./components/Header.component";
import Food from "./pages/Food.page";
import Recipe from "./pages/Recipe.page";
import ScrollTop from "./components/ScrollTop.component";

const App = () => {
  const location = useLocation();
  const position = useScroll();
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Header />
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route path='/cuisine/:type' element={<Cuisine />} />
          <Route path='/search/:query' element={<Food />} />
          <Route path='/recipe/:name' element={<Recipe />} />
        </Routes>
      </AnimatePresence>
      {position.y >= 500 && <ScrollTop />}
    </>
  );
};

export default App;
