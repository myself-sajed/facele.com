// this import provides different kinds of services
const Services = require('../services/services')()

// Models 
const User = require('../models/user')

class OTPController {
    SendOTP(req, res) {

        const { number } = req.body

        // Use of service
        const otp = Services.generateOTP()
        const ttl = 1000 * 60 * 2  // 2mins 

        const expires = Date.now() + ttl
        const data = `${number}.${otp}.${expires}`

        // Use of service
        const hash = Services.hashOTP(data)

        const response = {
            hash: hash,
            number: number,
            expires: expires,
            otp: otp,
        }
        res.send({ message: 'success', response })
    }

    VerifyOTP(req, res) {

        const { data: clientData, inputOtp } = req.body.data
        const data = `${clientData.number}.${inputOtp}.${clientData.expires}`

        // Use of service
        const clientHash = Services.hashOTP(data)

        //comparison
        if (clientHash === clientData.hash) {


            // check if user exist in the database
            Services.userExist({ number: clientData.number.toString() })
                .then(function (user) {
                    if (user) {
                        const token = Services.generateJWToken({ _id: user._id, name: user.username })
                        res.cookie.token = token
                        res.send({ message: 'valid&userexists', user, token })
                    }
                    else {
                        const user = new User({ number: clientData.number })
                        user.save()
                        res.send({ message: 'valid', user })
                    }
                });
        }
        else {
            res.send({ message: 'invalid' })
        }
    }
}

module.exports = new OTPController();

