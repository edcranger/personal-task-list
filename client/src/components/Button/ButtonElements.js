import styled from "styled-components";

export const ButtonStyle = styled.button`
  background: ${({ background }) => (background ? background : `none`)};
  border-radius: ${({ corners }) => (corners ? corners : "0")};
  border: ${({ border }) => (border === "none" ? "none" : "1px solid black")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "0.9rem")};
  min-width: 5rem;
  width: ${({ width }) => (width ? width : "auto")};
  height: ${({ height }) => (height ? height : "auto")};
  padding: 8px;
  font-weight: bolder;
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
