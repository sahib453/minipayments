const {JWT_SECRET}  = require('./config.cjs')
const jwt = require('jsonwebtoken')

const userMiddle = (req,res,next)=>{
const authHeader = req.headers.authorization

if(!authHeader){
    return res.status(403).json({
        msg:"Invalid Authorization"
    })
}

try{

const decoded = jwt.verify(authHeader,JWT_SECRET)
req.username=decoded.username
next()

}catch(err){
    res.status(400).json({
        msg:"Error",
        error:err.message
    })


}


}



module.exports = {
    userMiddle
}