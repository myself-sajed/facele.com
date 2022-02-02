const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    number: { type: String, required: true, unique: true },
    isActivated: { type: Boolean, default: false },
    username: { type: String, required: false },
    avatar: { type: String, required: false }
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)