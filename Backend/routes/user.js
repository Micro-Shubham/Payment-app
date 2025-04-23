const express = require("express")
const {User} = require("../db")
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config")
const {authmiddleware} = require("../middleware")
const zod = require("zod")

const router = express.Router()

// signup Schema using zod
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
    username: req.body.username
   })

   if(ExistingUser) {
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

   const userId = user._id

   // create new account
   await Account.create({
    userId,
    balance: 1+Math.random()*1000
   })

//    const dbUser = await User.create(body);
   const token = jwt.sign({
    userId,
   },JWT_SECRET)
   res.json({
    message:"user created successfully",
    token:token
   })
})



// sign in schema
const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})


router.post("/signin", async (req, res) => {
    const {success} = signinSchema.safeParse(req.body)
    if(!success) {
        return res.status(411).json("incorrect input")
    }



   const user = await User.findOne({
    username: req.body.username,
    password:req.body.password,
  })
   // if that user exist then
    if(user) {
    const token = jwt.sign({
        userId:user._id,

    }, JWT_SECRET);

     res.json({
        token:token
     })
     return;
  }

  res.status(411).json({
    message:"Error while loggin in"
  })
})



// route to update the user Information

const updateBody = zod.object({
    password:zod.string().min(6,"Password should be atlest 6 character").optional(),
    firstName:zod.string().min(1,"First name cannot be empty").optional(),
    lastName:zod.string().min(1,"Last name cannot be empty").optional()
})


router.put("/",authmiddleware,async (req,res) =>{

    const {success} = updateBody.safeParse(req.body)
    if(!success) {
        return res.status(411).json({error:"error while updating information" })
    }

  try{
    await User.updateOne({_id:req.userId},req.body)
    res.json({
        message:"udpated successfully"
    })
  } catch (err) {
   console.log(err)
    res.status(500).json({
        error: "server error",
        details: err.message
    })
   }
})



// Route to get users from the backend, filterable via firstName/lastName

// This is needed so users can search for their friends and send them money

router.get("/bulk", async(req,res) => {
    const filterData = req.query.filterData || ""

   try{
    const users = await User.find({
     $or: [
        {firstName:{$regex: filterData, $options:"i"}},
        {lastName:{$regex:filterData, $options:"i"}}
     ]
    })

    res.json({
        user: users.map(user => ({
            username:user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
   } catch(err) {
     res.status(500).json({error:"server error", details:err.message})
   }
    
     
})




module.exports = router;