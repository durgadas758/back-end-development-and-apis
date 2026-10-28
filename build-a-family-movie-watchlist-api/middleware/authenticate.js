import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "family-movie-watchlist-secret";

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : "";

  if (!token) {
    return res.status(401).json({
      error: "No token provided.",
    });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token.",
    });
  }
}