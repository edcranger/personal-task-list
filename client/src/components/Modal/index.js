import React, { useRef, useContext, useEffect } from "react";

import { useSpring, animated } from "react-spring";
import { FaTimes } from "react-icons/fa";

//styles
import { Background, Wrapper, ModalHeader } from "./ModalElements";

//context
import TaskContext from "../../context/tasks/taskContext";

const Modal = ({ title, opacity, children, showModal, setShowModal }) => {
  const modalRef = useRef();

  const taskContext = useContext(TaskContext);

  const { isEditing, userEditing } = taskContext;

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal || isEditing ? 1 : 0,
    transform: showModal || isEditing ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      userEditing(false);
    }
  };

  const close = () => {
    setShowModal(false);
    userEditing(false);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      {showModal && (
        <Background ref={modalRef} opacity={opacity} onMouseDown={closeModal}>
          <animated.div style={animation}>
            <Wrapper>
              <ModalHeader>
                <h3>{isEditing ? "Edit Task" : title}</h3>
                <FaTimes className="closeBtn" onClick={close} />
              </ModalHeader>
              {children}
            </Wrapper>
          </animated.div>
        </Background>
      )}
    </>
  );
};

export default Modal;
