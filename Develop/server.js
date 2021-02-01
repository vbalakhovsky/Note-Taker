const express = require("express");
const htmlRoutes = require("./routes/htmlRoute");
const apiRoutes = require("./routes/apiRoute");

const app = express();
const PORT = process.env.PORT || 8089;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT,()=> console.log(`Listening : ${PORT}`));