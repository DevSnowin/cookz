import React from "react";
import { GiCampCookingPot } from "react-icons/gi";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Searchbar from "../components/Searchbar.component";
import Categories from "../components/Categories.component";

const Header = () => {
  return (
    <div className=''>
      <Logo to='/'>
        <GiCampCookingPot size={34} />
        <h1>Cookz</h1>
      </Logo>
      <Searchbar />
      <Categories />
    </div>
  );
};
const Logo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-block: 2rem 4rem;
`;
export default Header;
