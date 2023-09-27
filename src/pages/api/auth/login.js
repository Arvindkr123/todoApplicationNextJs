import { User } from "@/Models/user";
import errorHandler, { asyncError } from "@/middleware/error";
import { ConnectDB, cokieSetter, generateToken } from "@/utils/feature";
import bcrypt from "bcrypt";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST") {
    return errorHandler(res, 400, "Only POST requests are allowed");
  }
  await ConnectDB();
  const { email, password } = req.body;

  if (!email || !password) {
    return errorHandler(res, 400, "Invalid email or password");
  }

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return errorHandler(res, 400, "email and password are invalid");
  }

  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    return errorHandler(res, 400, "password does not match");
  }

  const token = generateToken(user._id);

  cokieSetter(res, token, true);

  return res.status(200).json({
    success: true,
    message: `Welcome Back , ${user.name}`,
    user,
  });
});

export default handler;
