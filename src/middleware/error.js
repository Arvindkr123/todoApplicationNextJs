const errorHandler = (
  res,
  statusCode = 500,
  message = "Internal sever error"
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export const asyncError = (passedFunc) => async (req, res) => {
  try {
    return await Promise.resolve(passedFunc(req, res));
  } catch (error) {
    return errorHandler(res, 500, error.message);
  }
};

export default errorHandler;
