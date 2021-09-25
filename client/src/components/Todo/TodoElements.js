import { rgba } from "@react-spring/shared";
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

const btnType = {
  primary: `rgba(43, 59, 234)`,
  warning: `rgba(245, 181, 18)`,
  danger: `rgba(219, 37, 61)`,
};

export const Button = styled.button`
  min-width: 130px;
  height: 40px;
  background: ${({ type }) => (type ? btnType[type] : btnType["primary"])};
  color: var(--white);
  outline: none;
  border-radius: 5px;
  border: none;
  transition: all 0.2s ease-in-out;
  font-size: var(--fontMed);
  margin: 10px 0;

  :hover {
    transform: scale(1.01);
    cursor: pointer;
  }
`;
