const notFound = (req, res, next) => {
  //here we create the not found error and return a status code, next we pass it down to handle it
  const error = new Error(`Not found -- ${req.originalUrl}`);
  res.status(404);
  //pass the error down to handle it
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "👀" : error.stack,
  });
};

module.exports = {notFound, errorHandler};
