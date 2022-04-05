const express = require("express");
var bodyParser = require('body-parser')

const formSchemaJson = require("./schema.json");
const {validateUserResponse} = require("./valudateRules");


const app = express();
app.use(express.json());

app.get("/formSchema", function (req, res) {
    res.json(formSchemaJson);
});


app.post("/saveForm", function (req, res) {

    console.log(req.body.userResponse);

    const userResponse = req.body.userResponse;

    if(validateUserResponse(userResponse)) {
        return res.status(400).send({
            message: 'The userResponse is all correct'
        });
    }
    else {
        return res.status(422).send({
            message: 'The userResponse was incorrectly filled'
        });
    }
});

app.listen(8000, function () {
    console.log("app running on 8000");
});

