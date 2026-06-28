const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../repositories/user");

exports.create = async (req, res, next) => {
  try {
    const user = req.body;

    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(user.phone)) {
      return res.status(400).json({ message: "invalid phone format" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;

    const phoneExist = await User.findByPhone(user.phone);
    if (phoneExist) {
      return res.status(400).json({ message: "phone exists" });
    }

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

    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "invalid phone format" });
    }

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

exports.checkCookie = async (req, res, next) => {
  if (req.user) {
    return res.status(200).json({ message: "cookie ok" });
  } else {
    return res.status(401).json({ message: "cookie fail" });
  }
};
