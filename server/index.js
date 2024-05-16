const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRouter = require("./Router/userRouter");
const placesRouter = require("./Router/placesRouter");
const bookingRouter = require("./Router/bookingRouter");

require("dotenv").config();
const PORT = 3000;
const app = express();

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/place", placesRouter);
app.use("/book", bookingRouter);

app.listen(PORT, () => {
  console.log(`Server is on PORT: ${PORT}`);
});
