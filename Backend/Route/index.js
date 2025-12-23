const express=require('express')
const { creditWallet } = require('../Controller/Admincredit')
const { debitWallet } = require('../Controller/Admindebit')
const { getWalletBalance } = require('../Controller/Walletcontroller')
const { createOrder, getOrder } = require('../Controller/Ordercontroller')
const routes=express.Router()



routes.post('/admin/wallet/credit', creditWallet)
routes.post('/admin/wallet/debit', debitWallet)
routes.get('/wallet/balance', getWalletBalance)
// Orders
routes.post('/orders', createOrder);
routes.get('/orders/:order_id', getOrder);


module.exports=routes


