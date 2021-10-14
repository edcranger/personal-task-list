import styled from "styled-components";

//icon
import { FcPlus } from "react-icons/fc";

export const TaskColumnWrapper = styled.div`
  min-height: 300px;
  padding: 15px 10px;
  border-radius: 20px;
  border: 1px solid var(--lightGrey);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 6px 12px;
  display: grid;
  position: relative;
  grid-template-rows: 10px 30px 30px 1fr;

  h3 {
    font-size: var(--fonSmall);
    color: var(--darkGrey);
    text-align: center;
  }

  div.addButtonContainer {
    display: flex;
    width: 100%;
    height: 20px;
    justify-content: end;
  }

  .taskColumnOptionIcon {
    justify-self: end;
    font-size: 23px;

    :hover {
      color: var(--warning);
      cursor: pointer;
    }
  }
`;

export const DroppableContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  padding: 10px;
  border-radius: 10px;
  background: ${({ isDraggingOver }) =>
    isDraggingOver ? "var(--lightBlue)" : "white"};
`;

export const AddTodoBtn = styled(FcPlus)`
  font-size: 40px;
  transition: 0.3s;

  :hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

export const AddTodoForm = styled.div`
  padding: 10px 5px;
  font-size: var(--fontSmall);
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  justify-content: center;
  background: var(--lightGrey);
  border-radius: 20px;

  input {
    font-size: var(--fontSmall);
    border-radius: 20px;
    padding: 10px 20px;
    height: 40px;

    outline: none;
  }

  .formButtonContainer {
    display: flex;
    justify-content: end;
  }
`;
