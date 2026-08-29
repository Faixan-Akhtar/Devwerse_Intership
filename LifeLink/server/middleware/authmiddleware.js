const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing!",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid authorization format!",
      });
    }

    const token = authHeader.substring(7);

    // console.log("TOKEN RECEIVED:", token);

    if (!token) {
      return res.status(401).json({
        message: "Token missing!",
      });
    }

    const decoded = jwt.verify(token, process.env.Secret_key);

    // console.log("DECODED USER:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token!",
    });
  }
};

module.exports = authMiddleware;
