const express = require("express");
const router = express.Router();
const employeesMasterData = require("./employeesData");
const quizData = require("./quizData");
const routeUrl = "/api";
router.get("/", (req, res) => {
    res.send("Running Routers");
});

router.get("/api/quizData", (req, res) => {
    console.log(quizData);
    res.json(quizData);
});
router.put("/api/updateScore/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body.answers);

    let count = 0;
    let employeeId = req.params.id;
    let answerArr = req.body.answers;
    let correctAns = quizData["ans"];
    for (let i = 0; i < 10; i++) {
        if (answerArr[i]) {
            if (answerArr[i] == correctAns[i]) {
                count = count + 1;
            }
        }
    }
    employeesMasterData[employeeId]["score"] = count;

    res.json({ data: "scoreUpdated" });
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
    let newEmployeeData = req.body;

    let keys = employeesMasterData["keys"];
    let id = 0;
    if (keys.length !== 0) {
        keys = keys[keys.length - 1];
        id = Number(keys.split("emp")[1]) + 1;
    }
    newEmployeeData["id"] = "emp" + id;
    console.log(newEmployeeData);
    employeesMasterData["emp" + id] = newEmployeeData;
    employeesMasterData["keys"].push("emp" + id);
    console.log(employeesMasterData);
    res.json({ data: "success" });
});

router.put("/api/updateEmployee", (req, res) => {
    console.log(req.body);
    let employeeUpdateData = req.body;

    employeesMasterData[req.body.id] = {
        ...employeesMasterData[employeeUpdateData.id],
        ...employeeUpdateData,
    };
    res.json({ data: "Update Successfully" });
});

router.delete("/api/removeEmployee/:id", (req, res) => {
    console.log("=======>", req.params.id);
    employeesMasterData["keys"].splice(
        employeesMasterData.keys.indexOf(req.params.id),
        1
    );
    delete employeesMasterData[req.params.id];

    res.json({ data: "Successfully Deleted" });
});
module.exports = router;
