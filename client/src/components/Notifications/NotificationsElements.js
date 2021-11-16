import styled from "styled-components";

export const NotificationWrapper = styled.div`
  width: 300px;
  padding: 0;
`;

export const Headers = styled.h5`
  margin: 0;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "1rem")};
  padding: 15px 10px;
  text-align: left;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.1rem 1rem;
  background: ${({ isread }) =>
    !isread ? " rgba(142, 163, 255, 0.2)" : "none"};

  :hover {
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: flex-start;

  #avatar {
    margin-top: 9px;
  }
`;

export const Content = styled.div`
  margin: 0.5rem 0.8rem;
  flex: 1;
  text-align: left;
  font-size: 0.9rem;

  .time {
    margin-top: 5px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 0;
`;
