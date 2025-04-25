const mongoose = require("mongoose")
require('dotenv').config(); 

// mongoose.set('debug', true);

// connect mongodb locally
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
})
.then(() => console.log("connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error"))


// creating user Schema 
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: true
    },
    firstName: {
        type: String,
        requried: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        requried: true,
        trim: true,
        maxLength: 50
    },
})

// user model
const User = mongoose.model("User", userSchema);



// creating account schema 
const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, // reference to the user model
        ref:'User',
        required: true
    },
    balance: {
        type:Number,
        required: true,
        min:[0,"Balance cannot be negative"]
    }
})


const Account = mongoose.model('Account', accountSchema)

module.exports = {
    User,
    Account

}
