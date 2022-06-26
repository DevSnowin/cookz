import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
  let param = useParams();

  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  async function getRecipe(name) {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${param.name}/information?apiKey=${
        import.meta.env.VITE_RECIPE_API
      }`,
    );
    const detailData = await data.json();
    console.log(detailData);
    setDetails(detailData);
  }

  useEffect(() => {
    getRecipe(param.name);
  }, [param.name]);

  return (
    <RecipeWrapper>
      <RecipeName>
        <h3>Butter Jam</h3>
        <img
          src='https://images.pexels.com/photos/94443/pexels-photo-94443.jpeg?auto=compress&cs=tinysrgb&w=1600'
          alt={details.title}
        />
      </RecipeName>
      <Info>
        <Buttons>
          <Button
            className={activeTab === "instructions" && "active"}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" && "active"}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
        </Buttons>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details &&
              details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
          </ul>
        )}
      </Info>
    </RecipeWrapper>
  );
};

const RecipeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4rem;
`;
const RecipeName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 25rem;
  gap: 1rem;

  img {
    width: 100%;
    border-radius: 20px;
    object-fit: cover;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const Button = styled.button`
  background: transparent;
  border: 2px solid #121212;
  padding: 0.6rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &.active {
    background-color: #121212;
    color: #fff;
  }
`;

export default Recipe;
