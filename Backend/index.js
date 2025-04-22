const express = require("express")
const cors = require('cors')
const mainRouter = require("./routes/index")
const app = express();
// apply cors to all routes
app.use(cors());
// json body parsor
app.use(express.json())



app.use("/api/v1/",  mainRouter)




const PORT = 3000;
app.listen(PORT,() => {
    console.log(`server running at ${PORT}`);

}) 