import styled from "styled-components";

export const TaskItemWrapper = styled.div`
  display: grid;
  grid-template-rows: 40px 1fr auto;
  min-height: 200px;
  border: 1px solid var(--lightGrey);
  border-radius: 10px;
  background: var(--white);
  transition: transform 0.2s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 6px;

  :hover {
    transform: scale(1.05);
    z-index: 999;
  }
`;

export const TaskItemHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 3px 10px;

  .headerBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    padding: 5px;
    text-align: center;

    :hover {
      color: yellow;
      cursor: pointer;
      transition: 0.2s;
    }
  }
`;

export const TaskItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;

  h3 {
    font-size: var(--fontMed);
  }
`;

export const TaskItemFooter = styled.div`
  display: flex;
  padding: 5px 10px;
  justify-content: flex-end;
`;

export const TaskBadge = styled.p`
  background: green;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 25px;
  padding: 5px 10px;
  color: var(--white);
  border-radius: 20px;
  text-align: center;
`;
