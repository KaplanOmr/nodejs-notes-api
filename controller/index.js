const auth = require("../providers/auth");

const router = require("express").Router();

router.use("/", require("./main"));
router.use("/user", require("./user"));
router.use("/note", auth, require("./note"));

module.exports = router;