import styled from "styled-components";
import { AiOutlineCaretDown } from "react-icons/ai";
import React, { useState } from "react";

export const CollapseWrapper = styled.ul`
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
  height: ${(props) => (props.collapse ? "0" : "300px")};
  opacity: ${(props) => (props.collapse ? "0" : "1")};
  width: 100%;
  padding: 0 10px;
  border-bottom: 1px solid var(--lightGrey);
  transition: all 0.5s ease-in-out;
`;

const CollapseItemsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;

  :hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.03);
  }
`;

export const CollapseItem = ({ label, children }) => {
  const [collapse, setCollapse] = useState(true);

  const handleClick = () => setCollapse(!collapse);

  return (
    <CollapseContent>
      <CollapseItemsHeader onClick={handleClick}>
        <div>{label}</div>
        <AiOutlineCaretDown />
      </CollapseItemsHeader>
      {React.cloneElement(children, { collapse })}
    </CollapseContent>
  );
};
