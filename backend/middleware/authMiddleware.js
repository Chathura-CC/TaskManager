import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const protect = (req, res, next) => {
  const token =
    req.cookies.access_token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    console.log("Decoded token:", decoded);
    console.log("User attached to req:", req.user);

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

const protectAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
  next();
};

export { protect, protectAdmin };
