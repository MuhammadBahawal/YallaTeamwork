const { Schema, model } = require('mongoose')

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    method: {
        type: String,
        required: true,
    },
    isReferral: {
        type:  Boolean,
        required:  false,
        default: false
    },
    referralBy :{
        type: Schema.Types.ObjectId,
        ref: 'customers',
        required: false,
    }
}, { timestamps: true })

module.exports = model('customers', customerSchema)