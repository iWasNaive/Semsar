const jwt = require("jsonwebtoken");
const User = require("./../repositories/user");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.carrot;
    // console.log(token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, no token provided" });
    }

    const decoded = jwt.verify(token, process.env.secretKey);

    const user = await User.findById(decoded.userId);

    if (user.length === 0) {
      return res
        .status(401)
        .json({ message: "User not found or token is invalid" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(`[ERROR] Auth middleware failed: ${error.message}`);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = protect;
