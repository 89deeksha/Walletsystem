const Wallet = require('../Model/index')

const debitWallet = async (req, res) => {
  try {
    const { client_id, amount } = req.body

    // 1️⃣ Validation
    if (!client_id || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({
        error: 'client_id and valid amount are required'
      })
    }

    // 2️⃣ Find wallet
    const wallet = await Wallet.findOne({ client_id })
    if (!wallet) {
      return res.status(404).json({
        error: 'Wallet not found'
      })
    }

    // 3️⃣ Balance check
    if (wallet.balance < amount) {
      return res.status(400).json({
        error: 'Insufficient balance'
      })
    }

    // 4️⃣ Debit wallet
    wallet.balance -= amount
    await wallet.save()

    // 5️⃣ Success response
    res.status(200).json({
      message: 'Wallet debited successfully',
      wallet
    })

  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
}

module.exports = { debitWallet }
