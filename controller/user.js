const router = require("express").Router();

router.get("/", function(req, res, next){
    next("User info");
});

module.exports = router;