const express = require("express");
const app = express();
const { Noteroutes } = require("./Routes/myroutes");
// app.use(express.json());
app.use("/notes", Noteroutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});