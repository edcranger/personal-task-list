const mongoose = require("mongoose");
const chalk = require("chalk");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      chalk.blue(
        `MongoDB connected to  ${chalk.blue.bold.underline.bgWhite(
          conn.connection.host
        )}`
      )
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = dbConnect;
