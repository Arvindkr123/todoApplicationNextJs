import { Task } from "@/Models/task";
import errorHandler, { asyncError } from "@/middleware/error";
import { ConnectDB, checkAuth } from "@/utils/feature";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET") {
    return errorHandler(res, 400, "Only GET requests are allowed");
  }
  await ConnectDB();

  let user = await checkAuth(req);
  if (!user) {
    return errorHandler(res, 401, "Login first required");
  }
  const tasks = await Task.find({ user: user._id });
  res.status(200).json({
    success: true,
    tasks,
  });
});

export default handler;
