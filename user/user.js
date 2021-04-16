const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String},
    email: {type: String},
    password:{type: String},
    counter: {type: Number, default:30},
    created_at:{type: Date,  default:Date.now()},
    expires: {type: Date}
})

const User = new mongoose.model('user', userSchema)

module.exports = User;