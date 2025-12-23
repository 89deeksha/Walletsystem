const Wallet=require('../Model/index')


const creditWallet=async(req,res)=>{
try{
    const { client_id, amount } = req.body
    if (!client_id || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({
        error: 'client_id and valid amount are required'
      })
    }
    //create 
    const wallet=await Wallet.findOneAndUpdate(
        { client_id },
        { $inc: { balance: amount } },
        { upsert: true, new: true }
    )
    const walletObj = wallet.toObject();
    res.status(200).json({
      message: 'Wallet credited successfully',
       wallet: walletObj
    })
} catch (error) {
    res.status(500).json({ error: error.message })
  }

}
module.exports = { creditWallet }