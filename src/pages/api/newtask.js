import { Task } from "@/Models/task";
import errorHandler, { asyncError } from "@/middleware/error";
import { ConnectDB, checkAuth } from "@/utils/feature";

const handler = asyncError(async (req, res) => {
  await ConnectDB();
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST method is allowed");
  const { title, description } = req.body;
  if (!title || !description)
    return errorHandler(res, 400, "please enter all fields");
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 400, "please login first");
  await Task.create({
    title,
    description,
    user: user?._id,
  });
  res.json({
    success: true,
    message: "task created successfully",
  });
});

export default handler;
