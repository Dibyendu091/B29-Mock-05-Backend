const express = require("express");
const { connection } = require("./db");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./routes/UserRoutes");
const { auth } = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/users", userRouter);
app.use(auth);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("DB Connected");
  } catch (error) {
    console.log({ msg: error.message });
  }
  console.log(`Server is running at port ${process.env.PORT}`);
});
