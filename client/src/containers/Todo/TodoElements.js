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
