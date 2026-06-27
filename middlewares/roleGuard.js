const User = require("./../repositories/user");

exports.roleGuard = (role) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (user.role != role) {
        return res.status(401).json({ message: "access fail" });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
