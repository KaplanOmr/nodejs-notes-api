const { SHA256 } = require("crypto-js");

function generateHashPassword(password) {
    return SHA256(process.env.PASSWORD_PREFIX + password);
}

module.exports = {
    generateHashPassword
};