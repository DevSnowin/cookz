import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Food = () => {
  let param = useParams();

  const [foodRecipes, setFoodRecipes] = useState([]);

  async function getFoodRecipes(query) {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_RECIPE_API
      }&query=${query}`,
    );

    const recipes = await data.json();
    setFoodRecipes(recipes.results);
  }

  useEffect(() => {
    getFoodRecipes(param.query);
  }, [param.query]);

  return (
    <FoodRecipeWrapper>
      {foodRecipes ? (
        foodRecipes.map((recipe) => (
          <FoodRecipeCard key={recipe.id} to={`/recipe/${recipe.id}`}>
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
          </FoodRecipeCard>
        ))
      ) : (
        <h4>No recipes founded!</h4>
      )}
    </FoodRecipeWrapper>
  );
};

const FoodRecipeWrapper = styled.div`
  margin-block: 4rem;
  border-radius: 20px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 3rem;
`;

const FoodRecipeCard = styled(Link)`
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

export default Food;
