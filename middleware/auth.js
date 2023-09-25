const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded = jwt.verify(token, "bruce");
      req.body.userID = decoded.userID;
      next();
    } catch (error) {
      res.status(404).send({ msg: "Person is not authorized!!" });
    }
  } else {
    res.status(404).send({ msg: "Person is not authorized!!" });
  }
};

module.exports = {
  auth,
};
