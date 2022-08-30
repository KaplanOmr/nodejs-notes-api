const express = require("express");
const app = express();

const PORT = 3002;

app.get("/", (req, res) => {
    res.send("Hello!");
})

app.listen(PORT, () => {
    console.log(`API is ready!`);
});