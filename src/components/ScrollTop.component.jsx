import React from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ScrollTop = () => {
  return (
    <ScrollWrapper to='#' onClick={() => window.scrollTo(0, 0)}>
      <FaArrowUp size={34} color='#fff' />
    </ScrollWrapper>
  );
};

const ScrollWrapper = styled(NavLink)`
  position: fixed;
  bottom: 10%;
  right: 10%;
  background-color: #121212;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  animation: popup 0.2s forwards;
  /* transition: all 0.5s ease-in-out; */

  @keyframes popup {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default ScrollTop;
