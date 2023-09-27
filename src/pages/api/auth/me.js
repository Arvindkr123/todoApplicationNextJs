import errorHandler, { asyncError } from "@/middleware/error";
import { checkAuth } from "@/utils/feature";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET") {
    return errorHandler(res, 400, "Only GET requests are allowed");
  }

  const user = await checkAuth(req);
  if (!user) {
    return errorHandler(res, 201, "Login first required");
  }
  // console.log(user);

  res.status(200).json({
    success: true,
    user,
  });
});

export default handler;
