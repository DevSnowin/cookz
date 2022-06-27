import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
  let param = useParams();

  const [details, setDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("instructions");

  async function getRecipe(name) {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${param.name}/information?apiKey=${
        import.meta.env.VITE_RECIPE_API
      }`,
    );
    const detailData = await data.json();
    detailData.status !== "failure" && setDetails(detailData);
  }

  useEffect(() => {
    getRecipe(param.name);
  }, [param.name]);

  return (
    <div>
      {details ? (
        <RecipeWrapper>
          <RecipeName>
            <h3>{details.title}</h3>
            <img src={details.image} alt={details.title} />
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
              <Instructions>
                <h2>Summary: </h2>
                <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                <h2>Instructions: </h2>
                <h3
                  dangerouslySetInnerHTML={{ __html: details.instructions }}
                ></h3>
              </Instructions>
            )}
            {activeTab === "ingredients" && (
              <Ingredients>
                <h2>Ingredients: </h2>
                <ul>
                  {details &&
                    details.extendedIngredients.map((ingredient) => (
                      <li key={ingredient.id}>{ingredient.original}</li>
                    ))}
                </ul>
              </Ingredients>
            )}
          </Info>
        </RecipeWrapper>
      ) : (
        <p>No Recipe founded!</p>
      )}
    </div>
  );
};

const RecipeWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4rem;
  margin-block: 4rem;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
const RecipeName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  max-width: 50%;
  /* border: 2px solid #121212; */
  border-radius: 20px;
  /* padding: 1rem 2rem; */

  @media (max-width: 1000px) {
    max-width: 100%;
  }

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
  max-width: 50%;
  gap: 2rem;

  @media (max-width: 1000px) {
    max-width: 100%;
  }

  h3 {
    font-size: 1rem;
    font-weight: normal;
  }
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

const Instructions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
`;

const Ingredients = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
`;

export default Recipe;
