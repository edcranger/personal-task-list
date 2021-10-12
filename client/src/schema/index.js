import * as yup from "yup";

const taskSchema = yup.object().shape({
  taskTitle: yup.string().required("Task name is required."),
  description: yup.string().required().max(50).min(7),
  category: yup.string().required(),
});

const userSchema = yup.object().shape({
  full_name: yup.string().required("Your full name is required."),
  email: yup.string().required("Please enter email your email address."),
  password: yup.string().required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().required("Please enter email your email address."),
  password: yup.string().required(),
});

export { taskSchema, userSchema, loginSchema };
