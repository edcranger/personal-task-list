import styled from "styled-components";

export const TodoCard = styled.div`
  display: flex;
  width: 100%;
  padding: 0 20px;
  margin: 5px 0;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  transition: all 0.3s ease-in-out;

  h3 {
    color: var(--white);
  }

  :hover {
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
`;

export const TodoContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;
