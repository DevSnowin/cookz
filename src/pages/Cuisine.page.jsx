import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Cuisine = () => {
  let param = useParams();
  const [cuisine, setCuisine] = useState([]);

  async function getCuisine(name) {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_RECIPE_API
      }&cuisine=${name}`,
    );

    const recipes = await data.json();
    setCuisine(recipes.results);
  }

  useEffect(() => {
    getCuisine(param.type);
  }, [param.type]);

  return (
    <CuisineWrapper>
      {cuisine ? (
        cuisine.map((recipe) => (
          <CuisineCard key={recipe.id} to={`/recipe/${recipe.id}`}>
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
          </CuisineCard>
        ))
      ) : (
        <h4>No cuisine founded!</h4>
      )}
    </CuisineWrapper>
  );
};

const CuisineWrapper = styled.div`
  margin-block: 4rem;
  border-radius: 20px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 3rem;
`;

const CuisineCard = styled(Link)`
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
