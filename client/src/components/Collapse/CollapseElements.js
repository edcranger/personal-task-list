import styled from "styled-components";

export const CollapseWrapper = styled.div`
  list-style: none;
  border: 1px solid var(--lightGrey);
  padding: 0;
`;

export const CollapseContent = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
`;

export const CollapseCard = styled.div`
  height: ${(props) => (props.collapse ? "0" : "auto")};
  opacity: ${(props) => (props.collapse ? "0" : "1")};
  width: 100%;
  padding: 0 10px;

  transition: all 0.3s ease-in-out;
`;

export const CollapseItemsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;

  h4 {
    margin: 0;
  }

  :hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.03);
  }
`;
