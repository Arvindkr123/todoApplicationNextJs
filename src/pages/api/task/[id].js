import { Task } from "@/Models/task";
import errorHandler, { asyncError } from "@/middleware/error";
import { ConnectDB, checkAuth } from "@/utils/feature";

const handler = asyncError(async (req, res) => {
  await ConnectDB();
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 400, "Login first required");
  const taskId = req.query.id;
  const task = await Task.findById(taskId);
  if (!task) return errorHandler(res, 404, "Task not found");

  if (req.method === "PUT") {
    task.isCompleted = !task.isCompleted;
    await task.save();
    return res.status(200).json({
      success: true,
      message: "task updated successfully",
    });
  } else if (req.method === "DELETE") {
    await task.deleteOne();
    return res.status(200).json({
      success: true,
      message: "task deleted successfully",
    });
  } else {
    return errorHandler(res, 400, "Only PUT & DELETE requests are allowed");
  }
});

export default handler;
