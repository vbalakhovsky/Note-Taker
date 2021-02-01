var express = require("express");
const htmlRoutes = require("./routes/htmlRoute");
const apiRoutes = require(".routes/apiRoute");
var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT,()=> console.log(`Listening on PORT : ${PORT}`));