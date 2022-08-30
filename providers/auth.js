const router = require("express").Router();
const jwt = require("jsonwebtoken");

function getToken(req) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      }
    
      return false;
}

router.use(function(req,res,next){
    const token = getToken(req);
    
    if (!token) {
        next(new Error("REQUIRED_TOKEN"));
    }

    try {
        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.auth = decodeToken;
        next();
    } catch(e) {
        next(new Error("INVALID_TOKEN"));
    }
});


module.exports = router;
