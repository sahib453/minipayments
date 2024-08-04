const mongoose = require('mongoose')

const connectDB = async()=>{
    await mongoose.connect('mongodb://localhost:27017/paytm').then(()=>{
    console.log('successful connection')
}).catch((err)=>console.log('Error there',err))
}


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,'Must be unique'],
        minLength:[4,'Atleast 4 in length'],
        required:[true,'userId is needed']
    },
    password:{
        type:String,
        minLength:[6,'Atleast 6 in length'],
        required:[true,'A password is needed']
    },
    name:{
        type:String,
        required:[true,'A name is needed']
    }
})


const User = mongoose.model('users',userSchema)

const accountSchema = new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.ObjectId, //reference to user Model
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const Account = mongoose.model('Account',accountSchema)



module.exports  = {
    connectDB,
    User,
    Account
}


