import styled from "styled-components";

//icons
import { IoAddCircle } from "react-icons/io5";

/*======================Task======================== */

export const TasksWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  margin: 10px 0;
`;

export const AddTask = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

export const AddBtn = styled(IoAddCircle)`
  min-width: 100px;
  border-radius: 4px;
  border: none;
  font-size: 150px;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    color: green;
    transform: scale(1.2);
  }
`;
