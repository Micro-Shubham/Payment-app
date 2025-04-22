const express = require("express")
const {User} = require("../db")
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config")
const zod = require("zod")

const router = express.Router()

const signupSchema = zod.object ({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})


// sign up routes
router.post("/signup", async (req,res) =>{ 
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
   if(!success) {
    return res.json({
        message:"Email already taken/ Incorrect Inputs"
    })
   } 

   const ExistingUser = await User.findOne({
    username: body.username
   })

   if(ExistingUser._id) {
    return res.json({
        message: "Email already taken/ Incorrect inputs"
    })
   }



   const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
   })

   const dbUser = await User.create(body);
   const token = jwt.sign({
    userId:dbUser._id
   },JWT_SECRET)
   res.json({
    message:"user created successfully",
    token:token
   })
})

module.exports = router;