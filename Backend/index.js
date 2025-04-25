const express = require("express")
const app = express()
const cors = require('cors')
// apply cors to all routes
app.use(cors());
// json body parsor
app.use(express.json())

// Import the mainRouter from the routes folder
const mainRouter = require("./routes/index")



// Use the mainRouter for the '/api/v1/' route
app.use("/api/v1/",  mainRouter)




const PORT = 3000;
app.listen(PORT,() => {
    console.log(`server running at ${PORT}`);

}) 