import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "../../schema";

//context
import TaskContext from "../../context/tasks/taskContext";

//styles
import {
  TaskFormWrapper,
  TaskInput,
  TaskTextArea,
  CategoriesForm,
} from "./TaskFormElements";

//components
import { ErrorContainer, Button } from "../PageLayout/UtilStyles";

const TaskForm = ({ setShowModal, currTask }) => {
  const taskContext = useContext(TaskContext);
  const { addTask, updateTask, isEditing, currentTask } = taskContext;
  const [taskData, setTaskData] = useState({});

  const SelectData = ["", "personal", "group"];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
  });

  useEffect(() => {
    if (isEditing) {
      setTaskData(currTask);
      reset({
        taskTitle: currTask.taskTitle,
        description: currTask.description,
        category: currTask.category,
        type: currTask.taskType,
      });
    }
  }, [isEditing, currentTask, currTask, reset]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmitForm = (data) => {
    isEditing ? updateTask(taskData) : addTask(data);

    setShowModal(false);
  };

  const handleReset = () => {
    setTaskData({ taskTitle: "", description: "", category: "" });
  };

  return (
    <>
      <TaskFormWrapper onSubmit={handleSubmit(handleSubmitForm)}>
        <ErrorContainer>
          <p>{errors.taskTitle?.message}</p>
          <p>{errors.description?.message}</p>
          <p>{errors.category?.message}</p>
          <p>{errors.tasktype?.message}</p>
        </ErrorContainer>

        <TaskInput
          {...register("taskTitle")}
          type="text"
          defaultValue={taskData.taskTitle}
          placeholder="Task Name"
          onChange={handleChange}
        />
        <TaskTextArea
          {...register("description")}
          defaultValue={taskData.description}
          placeholder="Enter description."
          onChange={handleChange}
        />
        <CategoriesForm
          {...register("category")}
          defaultValue={taskData.category}
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

        <CategoriesForm
          {...register("taskType")}
          value={taskData.taskType}
          onChange={handleChange}
        >
          {SelectData.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </CategoriesForm>

        <div>
          {isEditing ? (
            <Button
              type="submit"
              rounded="10px"
              border="none"
              background="var(--darkGrey)"
            >
              Update
            </Button>
          ) : (
            <>
              <Button
                rounded="5px"
                border="none"
                fontColor="var(--darkGrey)"
                background="var(--success)"
                type="submit"
              >
                Create
              </Button>
              <Button
                rounded="5px"
                border="none"
                fontColor="var(--darkGrey)"
                background="var(--warning)"
                onClick={handleReset}
              >
                Clear
              </Button>
            </>
          )}
        </div>
      </TaskFormWrapper>
    </>
  );
};

export default TaskForm;
