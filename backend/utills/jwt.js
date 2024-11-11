import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export { generateToken };
