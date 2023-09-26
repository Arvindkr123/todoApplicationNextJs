import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: function (v) {
        return v.length >= 6;
      },
      message: "Password too short (minimum length is 6 characters)",
    },
  },
});

mongoose.models = {};

export const User = mongoose.model("User", schema);
