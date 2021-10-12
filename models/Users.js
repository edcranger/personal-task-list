const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  full_name: {
    type: String,
    require: [true, "Please enter a valid name"],
  },
  email: {
    type: String,
    require: [true, "Please enter a valid name"],
    unique: [true, "Email address already been used, please enter a new one."],
  },
  password: {
    type: String,
    require: [true, "Please enter a valid password"],
    select: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedJwtToken = async function (xcsrf_token) {
  return jwt.sign(
    { id: this._id, xsrfToken: xcsrf_token },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

UserSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
