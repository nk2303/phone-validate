var express = require("express");
var router = express.Router();

router.post("/api/v1/phone", (req, res, next) => {
    //save phone number
    res.json();
   });

router.post("/", function (req, res) {
    res.send('root')
  })

router.get("/api/v1/access", (req, res, next) => {
    //get both phone_number and access_code
    res.json(["HM","OK"]);
});

module.exports = api_routes;