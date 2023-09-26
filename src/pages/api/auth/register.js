import { User } from "@/Models/user";
import errorHandler, { asyncError } from "@/middleware/error";
import { ConnectDB, cokieSetter, generateToken } from "@/utils/feature";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST") {
    return errorHandler(res, 400, "Only POST requests are allowed");
  }
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return errorHandler(res, 400, "Invalid username or password and email");
  }

  await ConnectDB();
  let user = await User.findOne({ email });

  if (user) {
    return errorHandler(res, 400, "User registered with this email already");
  }

  user = await User.create({ email, password, name });
  const token = generateToken(user._id);
  cokieSetter(res, token, true);

  res.status(201).json({
    success: true,
    message: "User created successfully",
  });
});

export default handler;
