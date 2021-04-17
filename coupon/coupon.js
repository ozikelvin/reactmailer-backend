const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: String,
    isUsed: {
        type: String,
        default: false
    },
    created_at: { type: Date, default: Date.now() },
})

const Coupon = new mongoose.model('coupon', couponSchema)

module.exports = Coupon;