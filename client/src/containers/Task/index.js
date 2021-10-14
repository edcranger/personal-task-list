import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

//styles
import { Wrapper, Grid, BtnContainer, AddBtn } from "./TaskElements";

//context
import TaskColumnContext from "../../context/taskColumn/taskColumnContext";

//components
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import Modal from "../../components/Modal";
import Form from "../../components/Forms/Form";
import Input from "../../components/Forms/Input";
import Button from "../../components/Button";

const Task = () => {
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
    updateAllTaskColumns,
  } = useContext(TaskColumnContext);

  const submitAddTaskColumn = (e) => {
    setError("");
    e.preventDefault();

    if (!columnName) {
      return setError("Task column field is empty");
    }

    const newColumm = {
      columnName: columnName,
      todos: [],
    };

    const payload = { taskId, newColumm };

    addTaskColumn(payload);
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

  const handleUpdate = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    /*  setTaskCol(e.target.value); */
    setTaskColumn({ ...taskColumn, [name]: value });
  };

  const onUpdateSubmit = (e) => {
    e.preventDefault();

    updateTaskColumn(taskColumn);
  };

  const onDragEnd = (result) => {
    const newColumn = [...currentTaskColumns];
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = newColumn.find(
        (col) => col._id === source.droppableId
      );
      const destColumn = newColumn.find(
        (dest) => dest._id === destination.droppableId
      );
      const sourceItems = [...sourceColumn.todos];

      const destItems = [...destColumn.todos];
      const [removed] = sourceItems.splice(source.index, 1);

      destItems.splice(destination.index, 0, removed);

      const newTaskColumns = newColumn
        .map((col) =>
          col._id === source.droppableId ? { ...col, todos: sourceItems } : col
        )
        .map((col2) =>
          col2._id === destination.droppableId
            ? { ...col2, todos: destItems }
            : col2
        )
        .map((col3) => {
          return {
            ...col3,
            todos: col3.todos.map((item, index) => {
              return { ...item, index, column: col3._id };
            }),
          };
        });

      updateAllTaskColumns({ taskId: taskId, cols: newTaskColumns });
    } else {
      const newColumn = [...currentTaskColumns];
      const column = newColumn.find((col) => col._id === source.droppableId);

      const columnItems = [...column.todos];

      const [removed] = columnItems.splice(source.index, 1);

      columnItems.splice(destination.index, 0, removed);

      const newTaskColumns = newColumn
        .map((col) =>
          col._id === source.droppableId ? { ...col, todos: columnItems } : col
        )
        .map((col2) => {
          return {
            ...col2,
            todos: col2.todos.map((item, index) => {
              return { ...item, index, column: col2._id };
            }),
          };
        });

      updateAllTaskColumns({ taskId: taskId, cols: newTaskColumns });
    }
  };

  useEffect(() => {
    getAllColumns(taskId);

    return () => {
      setShowModal(false);
      setContentType("");
    };
    // eslint-disable-next-line
  }, [taskId]);

  if (!currentTaskColumns) {
    return <h1>Loading....</h1>;
  } else {
    return (
      <Wrapper>
        <Grid>
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            {currentTaskColumns.map((col) => {
              return <TaskColumn key={col._id} col={col} handler={handler} />;
            })}
          </DragDropContext>

          <BtnContainer>
            <AddBtn onClick={() => handler({ type: "add" })} />
          </BtnContainer>
        </Grid>

        {/* ======================MODAL AREA======================= */}
        <Modal showModal={showModal} setShowModal={setShowModal}>
          {contentType === "add" && (
            <Form onSubmit={submitAddTaskColumn}>
              <Input
                width="100%"
                corners="10px"
                placeholder="Column Name"
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
              />

              <BtnContainer>
                <Button hoverColor="var(--success)" border="none" type="submit">
                  Create Column
                </Button>
              </BtnContainer>
            </Form>
          )}

          {contentType === "update" && (
            <Form onSubmit={onUpdateSubmit}>
              <Input
                type="text"
                name="columnName"
                value={taskColumn.columnName}
                onChange={handleUpdate}
                width="100%"
                corners="10px"
              />
            </Form>
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
        </Modal>
      </Wrapper>
    );
  }
};

export default Task;
