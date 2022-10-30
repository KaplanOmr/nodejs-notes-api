const { SHA256 } = require("crypto-js");

function generateHashPassword(password) {
    return SHA256(process.env.PASSWORD_PREFIX + password);
}

function checkParams(obj, keys) {
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (typeof obj[key] === "undefined" || obj[key] === "") {
            return false;
        }
    }

    return true;
}

module.exports = {
    generateHashPassword,
    checkParams
};