import { User } from "@/Models/user";
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

export const checkAuth = async (req) => {
  //console.log(req.headers.cookie.split("=")[1]);
  const cookie = req.headers.cookie;
  if (!cookie) return null;
  const token = cookie.split("=")[1];
  const decoded_id_of_user = jwt.verify(token, process.env.jwtSecret);
  // console.log(decoded_id_of_user);
  return await User.findById(decoded_id_of_user);
};
