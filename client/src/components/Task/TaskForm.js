import React, { useState, useEffect, useContext } from "react";

//context
import TaskContext from "../../context/tasks/taskContext";

//styles
import {
  TaskFormWrapper,
  TaskInput,
  TaskTextArea,
  Button,
  ClearBtn,
  CategoriesForm,
} from "./TaskFormElements";

const TaskForm = () => {
  const taskContext = useContext(TaskContext);
  const { addTask, updateTask, isEditing, currentTask } = taskContext;

  const [taskData, setTaskData] = useState({
    taskTitle: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (isEditing) {
      setTaskData(currentTask);
    }
  }, [isEditing, currentTask]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateTask(taskData);
    } else {
      addTask(taskData);
      console.log("created");
    }

    console.log(taskData);

    setTaskData({ taskTitle: "", description: "", category: "" });
  };

  const handleReset = () => {
    setTaskData({ taskTitle: "", description: "", category: "" });
  };

  const { taskTitle, description, category } = taskData;

  return (
    <>
      <TaskFormWrapper onSubmit={handleSubmit}>
        <TaskInput
          type="text"
          name="taskTitle"
          placeholder="Task Name"
          value={taskTitle}
          onChange={handleChange}
        />
        <TaskTextArea
          name="description"
          placeholder="Enter description."
          value={description}
          onChange={handleChange}
        />
        <CategoriesForm
          name="category"
          value={category}
          onChange={handleChange}
        >
          <option className="custom-option" value=""></option>
          <option className="custom-option" value="Programming">
            Programming
          </option>
          <option className="custom-option" value="Basics">
            Basics
          </option>
          <option className="custom-option" value="Todo">
            Todo
          </option>
        </CategoriesForm>

        <div>
          {isEditing ? (
            <Button type="submit">Update</Button>
          ) : (
            <>
              <Button type="submit">Create</Button>
              <ClearBtn onClick={handleReset}>Clear</ClearBtn>
            </>
          )}
        </div>
      </TaskFormWrapper>
    </>
  );
};

export default TaskForm;
