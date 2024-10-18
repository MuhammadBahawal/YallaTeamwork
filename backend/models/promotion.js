const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Promotion schema (handles both coupon code and referral code)
const PromotionSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'customers',
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: false,
  },
  total_sold: {
    type: Number,
    default: 0,
  },
  total_earning: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: ['coupon code', 'referral code'],  
    required: true,
  },
  payment_status: {
    type: String,
    enum: ['pending', 'paid' , 'partially paid'],
    default: 'pending',
  },
  last_payment_paid: {
    type: Date,
    default: null,
  },
  item_payment_status_paid: {
    type: Number,
    default: 0,
  },
 
}, { timestamps: true });

// Create the model for Promotion
const Promotion = mongoose.model('Promotion', PromotionSchema);

module.exports = Promotion;
