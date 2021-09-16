import React from "react";
import Photo from "../../images/default-profile.png";

//styles
import { AvatarComponent } from "./AvatarElements";

const Avatar = () => {
  return <AvatarComponent src={Photo} name="Edison Ocampo" />;
};

export default Avatar;
