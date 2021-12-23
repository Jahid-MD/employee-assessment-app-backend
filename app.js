const { urlencoded } = require("body-parser");
const express = require("express");
const app = express();
const router = express.Router();
const routers = require("./routers");
app.use(express.json());
app.use(
    urlencoded({
        extended: true,
    })
);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(routers);

app.get("/", (req, res) => {
    res.send("Running.....");
});

app.listen(8080, () => {
    console.log("Server is running");
});
