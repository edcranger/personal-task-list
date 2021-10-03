import styled from "styled-components";

export const PageLayout = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 80px 1fr;
`;

export const PageMainContent = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  overflow: hidden;
`;

/* ====================Home Page Design=========================== */

export const HomeWrapper = styled.div`
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

export const SideContent = styled.div`
  padding: 10px 15px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const MainContent = styled.div`
  padding: 10px 15px;
  width: 100%;
  background: var(--white);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

/* ================Task Page Design==================== */

export const TaskWrapper = styled.section`
  width: 100%;
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 15px 10px;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
