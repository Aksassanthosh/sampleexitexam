const mongoose=require('mongoose')
const otpschema=new mongoose.Schema({
    email:String,
    otp:String,
    createdAt: { type: Date, default: Date.now, expires: 300 }

})
const OTP=mongoose.model("otp",otpschema)
module.exports=OTP;