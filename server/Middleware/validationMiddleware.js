import { validationResult } from "express-validator";

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  
  console.log("Validation Errors:", errors.array());
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => ({
        param: err.param, // Field name
        msg: err.msg, // Error message
      })),
    });
  }
  next();
};

export default validationMiddleware;
