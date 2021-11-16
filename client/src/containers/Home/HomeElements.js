import styled from "styled-components";

//icons
import { IoAddCircle } from "react-icons/io5";

export const Wrapper = styled.main`
  width: 100%;
  max-width: var(--maxWidth);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 2fr;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const SideSection = styled.aside`
  padding: 10px 15px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const MainSection = styled.section`
  padding: 10px 15px;
  width: 100%;
  background: var(--white);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Grid = styled.div`
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

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 0.3rem;
`;

export const Name = styled.p`
  margin-left: 0.6rem;
  font-size: 1rem;
  font-weight: normal;
`;
