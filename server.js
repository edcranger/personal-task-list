require("dotenv").config({ path: "./config/config.env" });

const chalk = require("chalk");
const express = require("express");
const app = express();
const dbConnect = require("./config/db");

//Initialize Database
dbConnect();

//Init Middleware
app.use(express.json({ extend: false }));

//Define routes
const users = require("./routes/users");
const auth = require("./routes/auth");
const tasks = require("./routes/task");
const todos = require("./routes/todos");
const taskColumns = require("./routes/taskColumn");

//Mount Routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/tasks", tasks);
app.use("/api/task-column", taskColumns);
app.use("/api/todos", todos);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server started on port ${chalk.yellow(PORT)} under ${chalk.yellow(
      process.env.NODE_ENV
    )} environment. `
  )
);
