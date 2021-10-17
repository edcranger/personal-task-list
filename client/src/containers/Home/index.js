import React, { useState, useEffect, useContext, useRef } from "react";

//context
import TaskContext from "../../context/tasks/taskContext";
import AuthContext from "../../context/auth/authContext";

//styles
import {
  Wrapper,
  SideSection,
  MainSection,
  Grid,
  AddTask,
  AddBtn,
} from "./HomeElements";

//conponents
import Avatar from "../../components/Avatar";
import Collapse from "../../components/Collapse";
import TaskItems from "../../components/Task/TaskItems";
import Button from "../../components/Button";
import TaskForm from "../../components/Task/TaskForm";
import Modal from "../../components/Modal";
import Input from "../../components/Forms/Input";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [deletingTask, setDeletingTask] = useState(false);
  const [currTask, setCurrTask] = useState(null);

  const text = useRef("");

  const {
    getAllTaskOfUser,
    tasks,
    filtered,
    clearFilterTasks,
    filterTasks,
    deleteTask,
    loading,
    userEditing,
  } = useContext(TaskContext);

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    getAllTaskOfUser();
  }, [isAuthenticated]);

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  }, [filtered]);

  const handleClick = () => setShowModal(true);

  const handler = ({ type, task }) => {
    if (type === "update") {
      setDeletingTask(false);
      userEditing(true);
    } else {
      setDeletingTask(true);
      userEditing(false);
    }
    setCurrTask(task);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteTask(currTask._id);
    setCurrTask(null);
    setDeletingTask(false);
    setShowModal(false);
  };

  const filterHandler = (e) => {
    text.current.value !== ""
      ? filterTasks(e.target.value)
      : clearFilterTasks();
  };

  return (
    <Wrapper>
      <SideSection>
        <Avatar />
        <Collapse />
      </SideSection>
      <MainSection>
        {/* This is the Filter search bar */}
        <Input
          width="100%"
          corners="20px"
          onChange={filterHandler}
          ref={text}
          type={text}
        />

        <Grid>
          {/*           {tasks.length === 0 && (
              <div>
                <h1>Please Add Task</h1>
              </div>
            )} */}

          {filtered !== null
            ? filtered.map((task) => (
                <TaskItems key={task._id} task={task} handler={handler} />
              ))
            : tasks.map((task) => (
                <TaskItems key={task._id} task={task} handler={handler} />
              ))}
        </Grid>

        <AddTask>
          <AddBtn onClick={handleClick} />
        </AddTask>
      </MainSection>

      {/* =====================  MODAL ============================= */}
      <Modal
        opacity="0.8"
        showModal={showModal}
        setShowModal={setShowModal}
        title="Add task"
      >
        {deletingTask ? (
          <div>
            <h3>Are you sure you want to delete this Task?</h3>
            <Button
              border="none"
              hoverColor="var(--danger)"
              onClick={confirmDelete}
            >
              Yes
            </Button>

            <Button
              border="none"
              hoverColor="var(--warning)"
              onClick={() => setShowModal(false)}
            >
              No
            </Button>
          </div>
        ) : (
          <TaskForm setShowModal={setShowModal} currTask={currTask} />
        )}
      </Modal>

      {/* ===================== END MODAL ============================= */}
    </Wrapper>
  );
};

export default Home;
