import React, { useRef } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const navigate = useNavigate();
  const searchRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    searchRef !== "" && navigate(`/search/${searchRef.current.value}`);
  }

  return (
    <SearchbarCon onSubmit={handleSubmit}>
      <SearchInput type='text' ref={searchRef} />
      <SearchIcon />
    </SearchbarCon>
  );
};

const SearchbarCon = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 3px solid #121212;
  max-width: 32rem;
  margin-inline: auto;
  padding: 0.2rem 0.8rem;
  border-radius: 20px;
`;
const SearchInput = styled.input`
  outline: none;
  border: 0;
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  font-family: "Ubuntu", sans-serif;
`;
const SearchIcon = styled(FiSearch)`
  font-size: 1.4rem;
  font-weight: bold;
`;

export default Searchbar;
