import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Popular = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopularRecipe();
  }, []);

  async function getPopularRecipe() {
    const recipe = localStorage.getItem("popular");

    if (recipe) {
      setPopular(JSON.parse(recipe));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${
          import.meta.env.VITE_RECIPE_API
        }&number=10`,
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      console.log(data.recipes);
      setPopular(data.recipes);
    }
  }

  return (
    <RecipeWrapper>
      <h3>Trending</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "2rem",
        }}
      >
        {popular ? (
          popular.map((recipe) => (
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
  margin: 2rem 0;
`;
const RecipeCard = styled.div`
  overflow: hidden;
  min-height: 20rem;
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

export default Popular;
