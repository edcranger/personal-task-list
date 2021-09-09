import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: var(--maxWidth);

  margin: 0 auto;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 300px 2fr;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const SideContent = styled.div`
  padding: 10px 15px;
  position: sticky;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const MainContent = styled.div`
  padding: 10px 15px;
  width: 100%;
`;
