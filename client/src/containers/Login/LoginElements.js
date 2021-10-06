import styled from "styled-components";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 15px 10px;

  align-items: center;

  .loginCard {
    margin: 30px;
  }

  .policyContainer {
    margin: 20px 0;
    font-size: 0.8rem;
    text-align: center;
  }

  @media screen and (max-width: 640px) {
    #card {
      box-shadow: none;
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat (auto-fill, 1fr);
  grid-gap: 15px;
`;

export const LoginHeader = styled.h2`
  text-align: center;
  color: var(--midGrey);

  span {
    color: #2f79fc;
    font-weight: bold;
  }
`;

export const SocialMediaLinksContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1.4rem;

  @media screen and (max-width: 640px) {
    display: flex;
    flex-direction: column;
  }
`;

export const SocialMediaLinks = styled.a`
  display: flex;
  width: 180px;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 640px) {
    width: 100%;
  }
`;
