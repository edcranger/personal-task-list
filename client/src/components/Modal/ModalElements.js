import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, ${({ opacity }) => (opacity ? opacity : 0.3)});
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 1000;
`;

export const Wrapper = styled.div`
  width: auto;
  margin-top: 10vh;
  margin-bottom: 0;
  max-width: 50vw;
  min-width: 50vw;
  min-height: 30vh;
  background: var(--white);
  border-radius: 10px;
  padding: 10px 20px;

  @media screen and (max-width: 768px) {
    min-width: 90vw;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;

  .closeBtn {
    :hover {
      color: red;
      transition: all 0.5s ease-in-out;
      cursor: pointer;
    }
  }
`;

export const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: var(--white);
  font-size: 24px;
  cursor: pointer;
`;
