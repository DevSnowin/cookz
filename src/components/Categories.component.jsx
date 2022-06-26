import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { GiNoodles } from "react-icons/gi";
import { GiWheat } from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";
import { FaPizzaSlice } from "react-icons/fa";

const Categories = () => {
  return (
    <CategoriesWrapper>
      <Category to='cuisine/thai'>
        <GiNoodles size={26} />
        <p>Thai</p>
      </Category>
      <Category to='cuisine/american'>
        <FaHamburger size={26} />
        <p>American</p>
      </Category>
      <Category to='cuisine/indian'>
        <GiWheat size={26} />
        <p>Indian</p>
      </Category>
      <Category to='cuisine/italian'>
        <FaPizzaSlice size={26} />
        <p>Italian</p>
      </Category>
    </CategoriesWrapper>
  );
};

const CategoriesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-block: 2rem;
`;
const Category = styled(NavLink)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  box-shadow: 0px 2px 27px #12121220;

  &.active {
    border: 3px solid #121212;
  }

  p {
    font-size: 0.8rem;
  }
`;

export default Categories;
