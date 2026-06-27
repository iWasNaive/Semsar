const express = require("express");

const categoryRouter = require("./routes/category");
const cityRouter = require("./routes/city");
const authRouter = require("./routes/auth");
const adRouter = require("./routes/ad");
const bookmarkRouter = require("./routes/bookmark");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);
app.use(express.static("public"));

app.use("/category", categoryRouter);
app.use("/city", cityRouter);
app.use("/auth", authRouter);
app.use("/ad", adRouter);
app.use("/bookmark", bookmarkRouter);

app.use(require("./middlewares/errHandler"));

module.exports = app;
