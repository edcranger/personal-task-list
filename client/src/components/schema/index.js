import * as yup from "yup";

const taskSchema = yup.object().shape({
  taskTitle: yup.string().required("task name is required."),
  description: yup.string().required().max(50).min(7),
  category: yup.string().required(),
});

export { taskSchema };
