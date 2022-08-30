const auth = function(req, res, next) {
    console.log("Login required")
    next();
}

module.exports = auth