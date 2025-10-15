const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const connectToDatabase = require("./connectToDataBase/db");
require("dotenv").config();
const userRouter = require("./routes/userRoutes");
const fitnessRouter = require("./routes/fitnessRoutes");
const dietRouter = require("./routes/dietRoutes");

const app = express();

connectToDatabase();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieparser());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/fitness", fitnessRouter);
app.use("/api/diet", dietRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is listning to port ${port}`);
});
