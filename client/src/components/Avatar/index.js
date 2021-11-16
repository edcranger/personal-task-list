import React from "react";
import Photo from "../../images/default-profile.png";

//styles
import { Wrapper, AvatarPhoto, AvatarLetter } from "./AvatarElements";

const Avatar = ({ src, name }) => {
  return (
    <Wrapper>
      {src ? (
        <AvatarPhoto src={Photo} />
      ) : (
        <AvatarLetter>{name.charAt(0).toUpperCase()}</AvatarLetter>
      )}
    </Wrapper>
  );
};

export default Avatar;
