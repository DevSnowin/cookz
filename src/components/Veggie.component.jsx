import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import useWindowSize from "../hooks/useWindowSize.hook";

const Veggie = () => {
  const [veggie, setVeggie] = useState([]);

  const windowSize = useWindowSize();

  useEffect(() => {
    getVeggie();
  }, []);

  async function getVeggie() {
    const recipe = localStorage.getItem("veggie");

    if (recipe) {
      setVeggie(JSON.parse(recipe));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${
          import.meta.env.VITE_RECIPE_API
        }&number=10&tags=vegetarian`,
      );
      const data = await api.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      console.log(data.recipes);
      setVeggie(data.recipes);
    }
  }

  return (
    <RecipeWrapper>
      <h3>Vegetarian</h3>
      <Splide
        options={{
          perPage: windowSize.width <= 680 ? 1 : 3,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: windowSize.width <= 1120 ? "1rem" : "2rem",
        }}
      >
        {veggie ? (
          veggie.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <RecipeCard>
                <Link to={`/recipe/${recipe.id}`}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Link>
              </RecipeCard>
            </SplideSlide>
          ))
        ) : (
          <p>No recipes found!</p>
        )}
      </Splide>
    </RecipeWrapper>
  );
};

const RecipeWrapper = styled.div`
  margin: 4rem 0 2rem 0;
`;
const RecipeCard = styled.div`
  overflow: hidden;
  min-height: 15rem;
  border-radius: 20px;
  position: relative;
  margin-block: 2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    position: absolute;
    inset: 0;
  }

  p {
    z-index: 10;
    color: white;
    text-align: left;
    font-size: 1rem;
    position: absolute;
    bottom: 5%;
    padding-left: 1rem;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;
