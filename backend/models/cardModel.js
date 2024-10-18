const { Schema, model } = require('mongoose')

const cardSchema = new Schema({
    userId : {
        type : Schema.ObjectId,
        required : true
    },
    productId : {
        type : Schema.ObjectId,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    isCoupon: {
        type :  Boolean,
        required : false,
        default: false
    },
    referralBy :{
        type: Schema.Types.ObjectId,
        ref: 'customers',
        required: false,
    }
},{timestamps : true})

module.exports = model('cardProducts',cardSchema)