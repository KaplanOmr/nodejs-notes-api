const sqlite = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite.Database(path.resolve("./database/notes_app.sqlite"));

module.exports = db;