import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  margin: 10px 0;
`;

export const GridContent = styled.div`
  min-height: 300px;
  padding: 15px 10px;
  border-radius: 20px;
  border: 1px solid var(--lightGrey);

  h3 {
    font-size: var(--fonSmall);
    color: var(--darkGrey);
    text-align: center;
  }
`;
