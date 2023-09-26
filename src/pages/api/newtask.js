import { Task } from "@/Models/task";
import errorHandler, { asyncError } from "@/middleware/error";
import { ConnectDB } from "@/utils/feature";

const handler = asyncError(async (req, res) => {
  await ConnectDB();
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST method is allowed");
  const { title, description } = req.body;
  await Task.create({
    title,
    description,
    user: "asdfasfdasdfasdfad",
  });
  res.json({
    success: true,
    message: "task created successfully",
  });
});

export default handler;
