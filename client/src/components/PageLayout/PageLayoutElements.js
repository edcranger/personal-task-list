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
