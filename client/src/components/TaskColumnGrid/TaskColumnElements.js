import styled from "styled-components";

//icon
import { FcPlus } from "react-icons/fc";

export const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  align-items: start;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  margin: 10px 0;
`;

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

export const Button = styled.button`
  background: ${({ background }) => (background ? background : `none`)};
  border-radius: ${({ rounded }) => (rounded ? "20px" : "none")};
  border: ${({ border }) => (border === "none" ? "none" : "1px solid black")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "10px")};
  height: 2.5rem;
  min-width: 5rem;
  width: auto;
  padding: 10px;
  font-weight: bolder;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;

  :hover {
    background: ${({ hoverColor }) => (hoverColor ? hoverColor : null)};
    cursor: pointer;
    color: var(--white);
  }
`;

/////////////////////// Task Column Form//////////////////////////////////
export const TaskColumnFormWrapper = styled.form`
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
`;

export const TaskColumnFormInput = styled.input`
  padding: 10px 8px;
  font-size: var(--fontMed);
  border-radius: 5px;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;
