const {JWT_SECRET} = require("./config")
const jwt = require("jsonwebtoken")


const authenticationMiddleware = (req, res, next) => {

    // Get the Authorization header  from the request
    const authenticatoinHeader = req.headers.authorization
    

    if(!authenticatoinHeader || !authenticatoinHeader.starsWith('Bearere')) {

        return res.status(403).json({error: "unauthorized"})

    }
         // Extract the token from the  "Bearer <token>  " string
    const token =authenticatoinHeader.split('')[1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        if(decoded.userId) { 
        req.userId = decoded.userId;
        next();
        } else {
            return res.status(403).json({error:"wrong userId/userId not found"})
        }
    }  catch(err) {
        return res.status(403).json({error:"Inavalid Token"})
    }

}


module.exports = {
    authenticationMiddleware
}