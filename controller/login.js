const router = require("express").Router();

router.post("/", function(req, res, next) {
    next("login");
});

module.exports = router;