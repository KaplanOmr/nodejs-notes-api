const router = require("express").Router();

router.get("/", (req, res, next) => {
    next("API_IS_ALIVE");
});

module.exports = router;