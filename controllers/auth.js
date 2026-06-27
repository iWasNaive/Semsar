const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../repositories/user");

exports.create = async (req, res, next) => {
  try {
    const user = req.body;
    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;

    const userId = await User.create(user);

    const token = jwt.sign({ userId }, process.env.secretKey);

    res.cookie("carrot", token, {
      httpOnly: true,
    });

    return res.status(201).json({ message: "register ok" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findByPhone(phone);

    if (!user) {
      return res.status(401).json({ message: "incorrect user or pass" });
    }

    const correctPass = await bcrypt.compare(password, user.password);

    if (!correctPass) {
      return res.status(401).json({ message: "incorrect user or pass" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.secretKey);

    res.cookie("carrot", token, {
      httpOnly: true,
    });

    return res.status(202).json({ message: "login ok" });
  } catch (error) {
    next(error);
  }
};
