const router = require("express").Router();
const db = require("../database");
const jwt = require("jsonwebtoken");

router.post("/", function (req, res, next) {
  if (typeof req.body.username === "undefined") {
    next(new Error("USERNAME_REQUIRED"));
    return;
  }

  if (typeof req.body.password === "undefined") {
    next(new Error("PASSWORD_REQUIRED"));
    return;
  }

  const query = db.prepare(
    "SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ? LIMIT 1"
  );

  query.each(
    [req.body.username, req.body.username, req.body.password],
    function (err, row) {
      if (err || typeof row === "undefined") {
        next(new Error("INVALID_CREDENTIALS"));
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
    }
  );
});

module.exports = router;
