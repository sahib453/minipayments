const {JWT_SECRET} = require('../config.cjs')

const express = require('express')
const { User, Account } = require('../db.cjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { userMiddle } = require('../usermiddleware.cjs')


router.post('/signup',async(req,res)=>{
    const body = req.body

const userCheck = await User.findOne({
    username:body.username
})
if(userCheck){
    return res.status(400).json({
        msg:"An account with same username already exists"
    })

}

try{

const dbUser = await User.create(body)
console.log(dbUser)

const username = dbUser._id

await Account.create({
    username,
    balance: 1 + Math.random()*10000
})

const token = jwt.sign({username:dbUser.username},JWT_SECRET)

res.json({
    msg:"Account creation successful",
    token:token
})

}catch(err){
    console.log(err)
    res.status(403).json({
        msg:"Error there",
        err:err.message
    })
}
})

router.post('/login',async(req,res)=>{
    const username = req.body.username
    const password = req.body.password


const check = await User.findOne({username,password})

if(check){
const token  = jwt.sign({username:username},JWT_SECRET)
res.send({
    msg:"logged in",
    token:token

})
}
    else{
    res.status(403).send('Wrong login')
}

})


router.get('/me', async (req, res) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            return res.status(401).send('Token is required');
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const username = decoded.username;

        console.log('Decoded token:', decoded); // Log the decoded token
        console.log('Username:', username); // Log the extracted username

    const user= await User.findOne({username})
    const id= user._id
    
    const account = await Account.findOne({username:id})
    console.log(id)
    console.log(account)


        res.json({
            username: username,
            balance: account.balance
        });
    } catch (err) {
        console.error('Error decoding token:', err); // Log any error
        return res.status(403).send('You are not authorized');
    }
});


router.get('/bulk',async(req,res)=>{
    const filter = req.query.filter||"";
    const users = await User.find({
        name:{
            "$regex":filter,
            "$options":"i"
        }
    })
res.json({
    users: users.map(user=>({
username: user.username,
name:user.name,
_id:user._id
    }))
})


})



module.exports = router