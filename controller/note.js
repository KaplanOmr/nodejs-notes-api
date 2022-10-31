const router = require("express").Router();
const db = require("../database");
const utils = require("../providers/utils");

router.get("/all", function (req, res, next) {
  if (!utils.checkParams(req.auth, ["user_id"])) {
    next(new Error("MISSING PARAMETER(S)"));
  }

  const query = db.prepare(
    "SELECT * FROM notes WHERE user_id = ? AND deleted = 0"
  );
  query.all([req.auth.user_id], function (err, row) {
    if (err || typeof row === "undefined") {
      next(new Error("NOT_FOUND_NOTES"));
      return;
    }

    next(row);
  });
});

router.post("/add", function (req, res, next) {
  if (
    !utils.checkParams(req.auth, ["user_id"]) ||
    !utils.checkParams(req.body, ["title", "note"])
  ) {
    next(new Error("MISSING PARAMETER(S)"));
  }

  const query = db.prepare(
    "INSERT INTO notes(user_id, title, note) VALUES (?, ?, ?)"
  );
  query.run([req.auth.user_id, req.body.title, req.body.note], function (err) {
    if (err) {
      next(new Error("NOTE_INSERT_ERR"));
      return;
    }

    next("SUCCESS");
  });
});

router.get("/:id", function (req, res, next) {
  if (
    !utils.checkParams(req.auth, ["user_id"]) ||
    !utils.checkParams(req.params, ["id"])
  ) {
    next(new Error("MISSING PARAMETER(S)"));
  }

  const query = db.prepare(
    "SELECT * FROM notes WHERE user_id = ? AND id = ? AND deleted = 0 LIMIT 1"
  );
  query.run([req.auth.user_id, req.params.id], function (err, row) {
    if (err || typeof row === "undefined") {
      next(new Error("INVALID_NOTE_ID"));
      return;
    }

    next(row);
  });
});

router.put("/:id/update", function (req, res, next) {
  if (
    !utils.checkParams(req.auth, ["user_id"]) ||
    !utils.checkParams(req.params, ["id"]) ||
    !utils.checkParams(req.body, ["title", "note"])
  ) {
    next(new Error("MISSING PARAMETER(S)"));
  }

  const query = db.prepare(
    "UPDATE notes SET title = ?, note = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ? AND deleted = 0"
  );
  query.run(
    [req.body.title, req.body.note, req.params.id, req.auth.user_id],
    function (err) {
      if (err) {
        next(new Error("NOTE_UPDATE_ERR"));
        return;
      }

      next("SUCCESS");
    }
  );
});

router.delete("/:id/delete", function (req, res, next) {
  if (
    !utils.checkParams(req.auth, ["user_id"]) ||
    !utils.checkParams(req.params, ["id"])
  ) {
    next(new Error("MISSING PARAMETER(S)"));
  }

  const query = db.prepare(
    "UPDATE notes SET deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ? AND deleted = 0"
  );
  query.run([req.params.id, req.auth.user_id], function (err) {
    if (err) {
      next(new Error("NOTE_DELETE_ERR"));
      return;
    }

    next("SUCCESS");
  });
});

module.exports = router;
