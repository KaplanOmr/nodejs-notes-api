const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res, next) => {
    next("API_IS_ALIVE");
});

module.exports = router;