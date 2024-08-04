const express = require('express')
const { Account } = require('../db.cjs')
const {User} = require('../db.cjs')
const { userMiddle } = require('../usermiddleware.cjs')
const mongoose = require('mongoose')
const router = express.Router()
const app = express()
const cors = require('cors')


/* router.get('/balance',userMiddle,async(req,res)=>{
    const user = req.username
console.log(user)

try{
    const account = await User.findOne({
        username:user
    })
    const balance = await Account.findOne({
        username:account._id
    })
    console.log(account)
    res.json({
        msg:"Balance is",
        balance:balance.balance
    })

}catch(err){
    return res.status(403).send("Error")
}

})
*/

app.use(cors())
app.use(express.json())
router.get('/balance', userMiddle, async (req, res) => {
    const user = req.username;
    console.log(user);
  
    try {
      // Use aggregation to directly find the user's account balance
      const result = await User.aggregate([
        { $match: { username: user } },
        {
          $lookup: {
            from: 'accounts', // the name of the collection in the database
            localField: '_id',
            foreignField: 'username',
            as: 'account'
          }
        },
        { $unwind: '$account' },
        { $project: { balance: '$account.balance' } }
      ]);
  console.log(result)
      if (!result.length) {
        return res.status(404).json({
          msg: 'User or Account not found'
        });
      }
  
      const balance = result[0].balance;
      console.log(`Balance for user ${user}: ${balance}`);
      
      res.json({
        msg: "Balance is",
        balance: balance
      });
  
    } catch (err) {
      return res.status(500).json({
        msg: 'Server error',
        error: err.message
      });
    }
  });
  
  router.post("/transfer", userMiddle, async (req, res) => {
    const theId = await User.findOne({
        username:req.username
    })
    const finalId = theId._id
    console.log(finalId)
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ username: finalId}).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });         
    }

    const toAccount = await Account.findOne({ username: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ username: finalId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ username: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});  



module.exports = router