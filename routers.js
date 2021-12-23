const express = require("express");
const router = express.Router();
const employeesMasterData = require("./employeesData");

const routeUrl = "/api";
router.get("/", (req, res) => {
    res.send("Running Routers");
});

router.get("/api/employees", (req, res) => {
    res.json(employeesMasterData);
});

router.get("/api/employees/:id", (req, res) => {
    console.log(req.params);
    res.json(employeesMasterData[req.params.id]);
});
router.post("/api/addEmployee", (req, res) => {
    console.log(req.body);
    employeesMasterData[req.body.id] = req.body;
    employeesMasterData["keys"].push(req.body.id);
    res.send("added Sucessfully");
});

router.put("/api/upadteEmployee", (req, res) => {
    console.log(req.body);
    employeesMasterData[req.body.id] = {
        ...employeesMasterData[req.body.id],
        ...req.body,
    };
    res.send("ok");
});

router.delete("/api/removeEmployee", (req, res) => {
    console.log(req.body);
    delete employeesMasterData[req.body.id];
    employeesMasterData["keys"].splice(
        employeesMasterData.keys.indexOf(req.body.id, 1)
    );
    res.send("deleted sucessfully");
});
module.exports = router;
