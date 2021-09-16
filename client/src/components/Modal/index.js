import React, { useRef, useContext } from "react";

import { useSpring, animated } from "react-spring";
import { FaTimes } from "react-icons/fa";

//styles
import { Background, Wrapper, ModalHeader } from "./ModalElements";

//context
import TaskContext from "../../context/tasks/taskContext";

const Modal = ({ children }) => {
  const modalRef = useRef();

  const taskContext = useContext(TaskContext);

  const { isEditing, showModal, openCloseModal, userEditing } = taskContext;

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal || isEditing ? 1 : 0,
    transform: showModal || isEditing ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      openCloseModal(false);
      userEditing(false);
    }
  };

  const close = () => {
    openCloseModal(false);
    userEditing(false);
  };

  return (
    <>
      {showModal || isEditing ? (
        <Background ref={modalRef} onMouseDown={closeModal}>
          <animated.div style={animation}>
            <Wrapper>
              <ModalHeader>
                <h3>{isEditing ? "Edit Task" : "Add Task"}</h3>
                <FaTimes className="closeBtn" onClick={close} />
              </ModalHeader>
              {children}
            </Wrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

export default Modal;
