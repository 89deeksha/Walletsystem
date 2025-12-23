const mongoose=require('mongoose')

const Walletschema=new mongoose.Schema({
    client_id:{
        type:String,
        required:true,
        unique:true
    },
    balance:{
        type:Number,
        default:0
    }
},{ timestamps: true })
const model=mongoose.model('clientwallet',Walletschema)

module.exports=model