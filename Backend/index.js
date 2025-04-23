const express = require("express")
const cors = require('cors')
// apply cors to all routes
app.use(cors());
// json body parsor
app.use(express.json())
const mainRouter = require("./routes/index")
const app = express();



app.use("/api/v1/",  mainRouter)




const PORT = 3000;
app.listen(PORT,() => {
    console.log(`server running at ${PORT}`);

}) 