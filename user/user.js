const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String},
    email: {type: String},
    password: { type: String },
    created_at: { type: Date, default: Date.now() },
    registrationMonth: { type: Number },
    token: String
})

const User = new mongoose.model('user', userSchema)

module.exports = User;