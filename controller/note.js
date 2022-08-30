const router = require("express").Router();

router.get("/", function(req, res, next) {
    next("Notes");
});


module.exports = router;