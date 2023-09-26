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

export const asyncError = (passedFunc) => (req, res) => {
  return Promise.resolve(passedFunc(req, res)).catch(
    errorHandler(res, 500, error.message)
  );
};

export default errorHandler;
