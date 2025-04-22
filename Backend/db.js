const mongoose = require("mongoose")
// connect mongodb locally
mongoose.connect("mongodb://localhost:27017/paytm")


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
module.exports = {
    User
}
