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
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px;

  h1 {
    margin: 0;
  }
`;

const colorObject = {
  pending: "red",
  inprogress: "yellow",
  completed: "green",
};

export const TodoStatus = styled.h4`
  color: ${({ status }) => (status ? colorObject[status] : colorObject["red"])};
  margin: 0;
`;

export const TodoContents = styled.div`
  flex: 1;
  padding: 20px 0px;
`;
