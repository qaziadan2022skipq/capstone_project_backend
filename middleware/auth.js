import Joi from "joi";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).json({ message: "Access Denied" });
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.use = verified;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const joiUserSchema = Joi.object().keys({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  username: Joi.string().alphanum().min(4).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
});
