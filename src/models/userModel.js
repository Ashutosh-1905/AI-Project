import {Schema, model} from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Namebe required."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email must be required."],
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, "Email must be at least 6 characters long"],
    maxLength: [50, "Email must not be longer than 50 characters"],
  },

  password: {
    type: String,
    required: [true, "Password must be required."],
    select: false,
  },
});

const User = model("User", userSchema);

export default User;
