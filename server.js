require("dotenv").config({ path: "./config/config.env" });
const path = require("path");
const express = require("express");
const dbConnect = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const chalk = require("chalk");
const errorHandler = require("./middleware/error");

const app = express();

//CORS
app.use(
  cors({
    credentials: true,
  })
);

//multer option
const filteStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//Initialize Database
dbConnect();

//init cookie parser
app.use(cookieParser());

//Init Middleware
app.use(express.json({ extend: false }));

//init Multer
app.use(
  multer({ storage: filteStorage, fileFilter: fileFilter }).array("photo", 5)
);

app.use("/images/", express.static(path.join(__dirname + "/images")));

//Define routes
const users = require("./routes/users");
const tasks = require("./routes/task");
const taskColumns = require("./routes/taskColumn");
const todos = require("./routes/todos");
const todoContents = require("./routes/todoContents");
const contributors = require("./routes/contributors");
const notifications = require("./routes/notifications");
const comments = require("./routes/comments");

//Mount Routes
app.use("/api/users", users);
app.use("/api/tasks", tasks);
app.use("/api/task-column", taskColumns);
app.use("/api/todos", todos);
app.use("/api/todo-contents", todoContents);
app.use("/api/contributors", contributors);
app.use("/api/notifications", notifications);
app.use("/api/comments", comments);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server started on port ${chalk.yellow(PORT)} under ${chalk.yellow(
      process.env.NODE_ENV
    )} environment. `
  )
);
