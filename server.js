const express = require("express");
const app = express();

//Define routes
const users = require("./routes/users");
const auth = require("./routes/auth");
const todos = require("./routes/todos");

//Mount Routes
app.use("/api/users", users);
app.use("/api/todos", todos);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
