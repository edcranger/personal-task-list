import styled from "styled-components";

export const Button = styled.button`
  background: ${({ background }) => (background ? background : `none`)};
  border-radius: ${({ rounded }) => (rounded ? rounded : null)};
  border: ${({ border }) => (border == "none" ? "none" : "1px solid black")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "10px")};
  height: 2.5rem;
  min-width: 5rem;
  width: auto;
  padding: 10px;
  font-weight: bolder;
  font-size: 1rem;
  color: ${({ fontColor }) => (fontColor ? fontColor : null)};
  transition: all 0.2s ease-in-out;
  margin: 10px 3px;

  :hover {
    background: ${({ hoverColor }) => (hoverColor ? hoverColor : null)};
    cursor: pointer;
    color: ${({ hoverFontColor }) => (hoverFontColor ? hoverFontColor : null)};
    opacity: 0.8;
  }
`;

export const ErrorContainer = styled.article`
  margin: 10px 0;
  width: 100%;
  text-align: center;
  font-weight: bold;

  p {
    color: var(--danger);
    margin: 0;
    text-align: center;
  }
`;
