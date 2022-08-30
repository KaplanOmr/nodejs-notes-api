const router = require("express").Router();

router.get("/", function(res, req, next){
    next("User info");
});

module.exports = router;