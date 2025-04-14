const express = require("express");
const cors = require("cors");
const app = express();
const workrouter = require("./routes/index")
app.use(cors());
app.use(express.json());
app.use("/api/v1", workrouter)
app.listen(3000)
