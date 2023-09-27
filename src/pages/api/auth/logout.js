import errorHandler, { asyncError } from "@/middleware/error";
import { cokieSetter } from "@/utils/feature";

const logout = asyncError(async (req, res) => {
  // check the method of request
  if (req.method !== "GET") {
    return errorHandler(res, 400, "Only GET requests are allowed");
  }
  cokieSetter(res, null, false);

  res.status(200).json({
    success: true,
    message: "logout successfully 🎯🎯",
  });
});

export default logout;
