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
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.static("public"));

app.use("/api/category", categoryRouter);
app.use("/api/city", cityRouter);
app.use("/api/auth", authRouter);
app.use("/api/ad", adRouter);
app.use("/api/bookmark", bookmarkRouter);

app.use(require("./middlewares/errHandler"));

module.exports = app;
