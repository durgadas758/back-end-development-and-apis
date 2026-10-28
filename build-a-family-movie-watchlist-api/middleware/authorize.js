
export function authorizeModification(req, res, next) {
  const role = req.user?.role;
  const requestedUserId = String(req.params.userId);
  const currentUserId = String(req.user?.id);

  if (
    role === "parent" ||
    (role === "child" && requestedUserId === currentUserId)
  ) {
    return next();
  }

  return res.status(403).json({ error: "Access denied" });
}
