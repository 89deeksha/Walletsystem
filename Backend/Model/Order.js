const mongoose=require('mongoose')
const orderSchema = new mongoose.Schema({
  client_id: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "PENDING" },  // SUCCESS, FAILED
  fulfillment_id: { type: String },              // returned from external fulfillment API
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);