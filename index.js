require("dotenv").config();

const express = require("express");
const controller = require("./controller");

const app = express();

app.use(express.urlencoded({extended:true}));

app.use(controller);

//Pass error if received unexpected action
app.use(function(res,res,next){
    const err = new Error("UNEXCEPTED_ACTION");
    err.status = 404;

    next(err);
})


//Global response handler
app.use(function(data, req, res, next){
    let status = 200;
    let responseData = {
        "status": true,
        "data": data
    };

    //if reveiced error
    if (data instanceof Error) {
        status = data.status || 500;
        responseData = {
            "status": false,
            "error": data.message
        };
    }

    res.status(status);
    res.json(responseData);
});

app.listen(process.env.PORT, () => {
    console.log(`API is ready!`);
});