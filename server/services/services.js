const crypto = require('crypto');
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Room = require('../models/room')

// to provide all the services like generating OTPs or hashing or verifying tokens etc...
function Services() {
    return {

        // Only for generating OTPs
        generateOTP: function () {
            return crypto.randomInt(1000, 9999)
        },

        // Only for hashing OTP
        hashOTP: function (data) {
            return crypto.createHmac('sha256', process.env.HASH_SECRET_KEY).update(data).digest('hex')
        },

        // to filter user model 
        userExist: async function (filter) {
            return await User.findOne(filter)
        },

        // Only to generate token
        generateJWToken: function (data) {
            return jwt.sign(data, process.env.JWT_SECRET_KEY)
        },

        // Only to return decoded token
        decodeToken: function (data) {
            return jwt.decode(data, process.env.JWT_SECRET_KEY)
        },

    }
}

module.exports = Services;