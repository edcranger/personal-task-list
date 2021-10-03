import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

import { v4 as uuidv4 } from "uuid";

//styles
import {
  Wrapper,
  Button,
  BtnContainer,
  TaskColumnFormWrapper,
  TaskColumnFormInput,
} from "./TaskColumnElements";
import { AddBtn } from "../Task/TasksElements";

//componet
import TaskColumn from "./TaskColumn";
import Modal from "../Modal";

//context
import TaskColumnContext from "../../context/taskColumn/taskColumnContext";

import TaskColumnForm from "./TaskColumnForm";
import { ErrorContainer } from "../PageLayout/UtilStyles";

const TaskColumnGrid = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskColumn, setTaskColumn] = useState(null);
  const [columnName, setColumnName] = useState("");
  const [error, setError] = useState("");
  const [contentType, setContentType] = useState("");

  const { taskId } = useParams();

  const {
    currentTaskColumns,
    getAllColumns,
    addTaskColumn,
    updateTaskColumn,
    deleteTaskColumn,
  } = useContext(TaskColumnContext);

  useEffect(() => {
    getAllColumns(taskId);

    return () => {
      setShowModal(false);
      setContentType("");
    };
  }, [taskId]);

  const submitAddTaskColumn = (e) => {
    setError("");
    e.preventDefault();

    if (!columnName) {
      return setError("Task column field is empty");
    }

    const newColumm = {
      columnName: columnName,
      task: taskId,
      todos: [],
      user: "1235f02345345345",
      _id: uuidv4(),
    };

    addTaskColumn(newColumm);
    setColumnName("");
    setShowModal(false);
    setError("");
  };

  const handler = ({ type, col }) => {
    if (type !== "add") {
      setTaskColumn(col);
    }
    setContentType(type);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteTaskColumn(taskColumn._id);
    setTaskColumn(null);
    setShowModal(false);
  };

  const onDragEnd = (result) => {
    console.log(result);
  };

  if (!currentTaskColumns) return <h1>Loading....</h1>;
  return (
    <Wrapper>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {currentTaskColumns.map((col) => (
          <TaskColumn key={col._id} col={col} handler={handler}></TaskColumn>
        ))}
      </DragDropContext>

      <BtnContainer>
        <AddBtn onClick={() => handler({ type: "add" })} />
      </BtnContainer>

      {/* ======================MODAL AREA======================= */}
      <Modal
        title={contentType ? "Add Column" : null}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {contentType === "update" && (
          <TaskColumnForm
            taskColumn={taskColumn}
            updateTaskColumn={updateTaskColumn}
          />
        )}

        {contentType === "delete" && (
          <div>
            <h3>Are you sure you want to delete this todo?</h3>
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
        )}

        {contentType === "add" && (
          <TaskColumnFormWrapper onSubmit={submitAddTaskColumn}>
            {error ? (
              <ErrorContainer>
                <p>{error}</p>
              </ErrorContainer>
            ) : null}
            <TaskColumnFormInput
              placeholder="Column Name"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
            />
            <BtnContainer>
              <Button hoverColor="var(--success)" border="none" type="submit">
                Add
              </Button>
            </BtnContainer>
          </TaskColumnFormWrapper>
        )}
      </Modal>
    </Wrapper>
  );
};

export default TaskColumnGrid;
