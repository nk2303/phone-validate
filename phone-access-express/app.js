var express = require("express");
var app = express();

const routes = require('./routes/api_routes');

app.get("/api/v1/demo", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });

app.listen(3000, () => {
 console.log("Server running on port 3000");
});