import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const ConnectDB = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "NextTodo",
  });
  console.log(`Database connected on : ${connection.host}`);
};

export const cokieSetter = (res, token, set) => {
  res.setHeader(
    "Set-Cookie",
    serialize("token", set ? token : "", {
      path: "/",
      httpOnly: true,
      maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
    })
  );
};

export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.jwtSecret);
};
