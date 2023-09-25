const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Signup
userRouter.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    bcrypt.hash(password, 10, async (error, hash) => {
      let user = new UserModel({
        email,
        password: hash,
      });
      await user.save();
      res.status(200).send(user, "Account created");
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.find({ email });
    if (user.length > 0) {
      const matchPassword = await bcrypt.compare(password, user[0].password);
      if (matchPassword) {
        const token = jwt.sign(
          { userID: user[0]._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
          "bruce"
        );

        res.status(200).send({ msg: "Login Success", token: token });
      } else {
        res.status(404).send({ msg: "Wrong Credentials" });
      }
    } else {
    }
  } catch (error) {
    res.status(404).send({ msg: "Wrong Credentials" });
  }
});

module.exports = {
  userRouter,
};
