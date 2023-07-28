const express = require("express");
const app = express();
const { Noteroutes } = require("./Routes/myroutes");

app.use("/notes", Noteroutes);

app.listen(4500, () => {
    console.log("Server is running on port 3000.");
});