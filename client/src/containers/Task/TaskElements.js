import styled from "styled-components";

//icons
import { IoAddCircle } from "react-icons/io5";

export const Wrapper = styled.main`
  width: 100%;
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 15px 10px;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Grid = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  align-items: start;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  margin: 10px 0;
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

export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;
