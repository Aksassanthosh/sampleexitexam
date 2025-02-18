const express=require('express')
const app= express()
app.use(express.json())
const cors=require("cors")
app.use(cors())
const otpRoutes=require('./routes/otproutes')

require("dotenv").config()
require('./db/connection')
app.use("/otps",otpRoutes)


app.listen(process.env.PORT,()=>{
    console.log("server is listening on port 3000." )
})
