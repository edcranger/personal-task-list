import styled from "styled-components";

export const Menu = styled.div`
  position: absolute;
  min-width: 200px;
  width: 100%;
  display: ${({ showMenu }) => (showMenu ? "flex" : "none")};
  flex-direction: column;
  background: ${({ background }) =>
    background ? background : "var(--lightGrey)"};
  transition: all 0.3s ease-in-out;
  z-index: 100;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  top: 60px;
  right: 20px;
  color: var(--darkGrey);
`;

export const MenuItem = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  padding: 10px 10px;
  justify-content: center;
  align-items: center;
  width: auto;
  transition: 0.3s ease-in-out;
  text-align: start;

  :hover {
    background: var(--warning);
    cursor: pointer;
  }
`;
