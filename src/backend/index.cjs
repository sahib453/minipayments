const express = require('express') 
const {connectDB} = require('./db.cjs')
const userRouter = require('./routes/user.cjs')
const accountRouter = require('./routes/account.cjs')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
connectDB()

app.get('/',async(req,res)=>{
    res.send('Hi there')
})


app.use('/user',userRouter)
app.use('/account',accountRouter)



app.listen(3000,()=>{
    console.log('server started')
})