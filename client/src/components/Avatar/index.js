import React from "react";
import Photo from "../../images/default-profile.png";

//styles
import {
  Wrapper,
  AvatarPhoto,
  AvatarName,
  AvatarLetter,
} from "./AvatarElements";

const Avatar = ({ src, name }) => {
  return (
    <Wrapper>
      {src ? (
        <AvatarPhoto src={Photo} />
      ) : (
        <AvatarLetter>{name.charAt(0).toUpperCase()}</AvatarLetter>
      )}

      <AvatarName>{name}</AvatarName>
    </Wrapper>
  );
};

export default Avatar;
