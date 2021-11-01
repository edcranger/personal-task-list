import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: flex;
  align-items: center;
  padding: 10px 0;
`;

export const AvatarPhoto = styled.img`
  border-radius: 50%;
  width: 100%;
  max-width: 35px;
`;

export const AvatarLetter = styled.div`
  background: green;
  color: var(--white);
  font-weight: bold;
  height: 40px;
  width: 40px;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AvatarName = styled.h1`
  font-size: var(--fontSmall);
  color: var(--darkgrey);
  margin-left: 20px;
`;
