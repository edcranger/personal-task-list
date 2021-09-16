import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--lightGrey);
`;

const AvatarPhoto = styled.img`
  border-radius: 50%;
  width: 100%;
  max-width: 35px;
`;

const AvatarName = styled.h1`
  font-size: var(--fontSmall);
  color: var(--darkgrey);
  margin-left: 20px;
`;

export const AvatarComponent = ({ src, name }) => {
  return (
    <Wrapper>
      <AvatarPhoto src={src} />
      <AvatarName>{name}</AvatarName>
    </Wrapper>
  );
};
