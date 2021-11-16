import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 20px 5px;
  display: flex;
  background: red;
  flex-direction: column;
`;

export const UserItem = styled.div`
  display: flex;
  margin: 2px;
  padding: 3px 5px;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InfoHolder = styled.div`
  display: flex;
  align-items: center;

  .nameContainer {
    margin-left: 1rem;
    font-size: 1rem;
    font-weight: bold;
  }
`;

export const ButtonHolder = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: end;
`;
