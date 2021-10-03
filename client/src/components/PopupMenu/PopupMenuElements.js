import styled from "styled-components";

export const TaskColumnMenuContainer = styled.div`
  display: flex;
`;

export const TaskColumnMenu = styled.div`
  position: absolute;
  display: "flex";
  flex-direction: column;
  top: 20px;
  left: 10px;
  width: 150px;
  background: var(--lightGrey);
  transition: all 0.3s ease-in-out;
  z-index: 100;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const TaskColumnMenuItem = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  transition: 0.3s ease-in-out;

  :hover {
    background: var(--warning);
    cursor: pointer;
  }
`;
