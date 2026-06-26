const express = require("express");

const categoryRouter = require("./routes/category");
const cityRouter = require("./routes/city");
const authRouter = require("./routes/auth");
const adRouter = require("./routes/ad");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/category", categoryRouter);
app.use("/city", cityRouter);
app.use("/auth", authRouter);
app.use("/ad", adRouter);

app.use(require("./middlewares/errHandler"));

module.exports = app;
