import styled from "styled-components";

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

export const Name = styled.p`
  margin-left: 0.6rem;
  font-size: 1rem;
  font-weight: normal;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 20px;
`;

export const TodoTitle = styled.h3`
  margin: 1rem 0;
  font-size: 2rem;
  color: var(--midGrey);
`;

export const AddContentButton = styled.button`
  width: 300px;
  border-radius: 20px;
  outline: none;
  border: none;
  font-size: 1.1rem;
  background: rgba(87, 108, 201, 1);
  padding: 15px 20px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  :hover {
    background: rgba(87, 108, 201, 0.6);
    color: #3451cf;
  }
`;

export const Spliter = styled.div`
  margin: 10px 0;
  border-top: 1px solid var(--lightGrey);
`;

export const ContentContainer = styled.div``;
