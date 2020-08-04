

app.post("/api/v1/phone", (req, res, next) => {
    //save phone number
    res.json(["LOL","WOW"]);
   });

app.get("/api/v1/access", (req, res, next) => {
    //get both phone_number and access_code
    res.json(["HM","OK"]);
});

export const api_routes = {
    
}