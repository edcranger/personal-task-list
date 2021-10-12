import styled from "styled-components";

export const Banner = styled.div`
  background-color: ${({ background }) =>
    background ? background : "var(--lightGrey)"};
  color: ${({ fontColor }) => (fontColor ? fontColor : "var(--darkGrey)")};
  padding: 10px;
  border-radius: 8px;

  p {
    padding: 0;
    margin: 0;
    font-weight: 500;
    margin: 0.1rem 0;
  }
`;
