const router = require("express").Router();
const db = require("../database");

router.get("/", function(req, res, next){
    const query = "SELECT * FROM users";

    db.all(query, function(err, data) {
        if (err) {
            next(err);
        }

        next(data);
    });
    
});

module.exports = router;