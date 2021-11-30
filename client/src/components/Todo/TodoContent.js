import React from "react";
import Avatar from "../Avatar";

//import styles
import { TodoContentWrapper } from "./TodoElements";

//components

const TodoContent = ({ content }) => {
  const { user, description } = content;
  return (
    <TodoContentWrapper>
      <Avatar name={user.full_name} />
      {user.full_name}
    </TodoContentWrapper>
  );
};

export default TodoContent;
