const express = require("express")
const cors = require('cors')
const mainRouter = require("./routes/index")
const app = express();
// apply cors to all routes
app.use(cors());



app.use("/api/v1/",  mainRouter)