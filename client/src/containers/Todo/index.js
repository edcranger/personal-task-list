import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

//icons
import { MdAdd } from "react-icons/md";

//styles
import {
  Wrapper,
  SideSection,
  MainSection,
  Name,
  AvatarWrapper,
  TodoTitle,
  AddContentButton,
  ContentContainer,
  Spliter,
} from "./TodoElements";

//components
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Input from "../../components/Forms/Input";
import Modal from "../../components/Modal";

//context
import TodoContext from "../../context/todos/TodoContext";
import AuthContext from "../../context/auth/authContext";
import AddContent from "../../components/AddContent";
import TodoContent from "../../components/Todo/TodoContent";

const Todo = () => {
  const [showModal, setShowModal] = useState(false);

  const { todoId } = useParams();
  const { getSingleTodo, getAllContent, todo, contents } =
    useContext(TodoContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getSingleTodo(todoId);
    getAllContent(todoId);
  }, [todoId]);

  return (
    <Wrapper>
      <SideSection>
        <AvatarWrapper>
          <Avatar name={user ? user.full_name : " "} />
          <Name>{user ? user.full_name : " "}</Name>
        </AvatarWrapper>
      </SideSection>
      <MainSection>
        <TodoTitle>{todo ? todo.title : null}</TodoTitle>
        <AddContentButton onClick={() => setShowModal(true)}>
          <MdAdd />
          Add new content
        </AddContentButton>
        <Spliter />
        <ContentContainer>
          {contents
            ? contents.map((content) => (
                <TodoContent key={content._id} content={content} />
              ))
            : null}
        </ContentContainer>
      </MainSection>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <AddContent todoId={todoId} setShowModal={setShowModal} />
      </Modal>
    </Wrapper>
  );
};

export default Todo;
