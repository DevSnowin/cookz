import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.page";
import Cuisine from "./pages/Cuisine.page";
import Header from "./components/Header.component";
import Food from "./pages/Food.page";
import Recipe from "./pages/Recipe.page";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cuisine/:type' element={<Cuisine />} />
        <Route path='/search/:query' element={<Food />} />
        <Route path='/recipe/:name' element={<Recipe />} />
      </Routes>
    </Router>
  );
};

export default App;
