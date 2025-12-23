const Wallet = require('../Model/index')

const getWalletBalance = async (req, res) => {
  try {
    const client_id = req.headers['client-id']

    if (!client_id) {
      return res.status(400).json({
        error: 'client-id header required'
      })
    }

    const wallet = await Wallet.findOne({ client_id })

    if (!wallet) {
      return res.status(404).json({
        error: 'Wallet not found'
      })
    }

    return res.status(200).json({
      client_id,
      balance: wallet.balance
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getWalletBalance }
