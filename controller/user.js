const router = require("express").Router();
const db = require("../database");
const jwt = require("jsonwebtoken");
const auth = require("../providers/auth");
const utils = require("../providers/utils");

router.post("/login", function (req, res, next) {
  if (!utils.checkParams(req.body, ["username", "password"])) {
    next(new Error("MISSING_PARAMETER(S)"));
  }

  const query = db.prepare(
    "SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ? LIMIT 1"
  );

  query.each(
    [
      req.body.username,
      req.body.username,
      utils.generateHashPassword(req.body.password),
    ],
    function (err, row) {
      if (err) {
        next(new Error("USER_LOGIN_ERR"));
        return;
      }

      const payload = {
        user_id: row.id,
        username: row.username,
      };

      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: process.env.EXPIRESIN,
      });
      next(token);
    },
    function (err, count) {
      if (count === 0) {
        next(new Error("INVALID_CREDENTIALS"));
      }
    }
  );
});

router.post("/register", function (req, res, next) {
  if (!utils.checkParams(req.body, ["username", "email", "passord"])) {
    next(new Error("MISSING_PARAMETER(S)"));
  }

  const query = db.prepare(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
  );

  query.run(
    [
      req.body.username,
      req.body.email,
      utils.generateHashPassword(req.body.password),
    ],
    function (err) {
      if (err) {
        next(new Error("USER_REGISTER_ERR"));
        return;
      }

      next("SUCCESS");
    }
  );
});

module.exports = router;
