// this import provides different kinds of services
const Services = require('../services/services')()
const jwt = require('jsonwebtoken')
// user model
const User = require('../models/user')
const Jimp = require('jimp')
const path = require('path')

class UserController {

    async ActivateUser(req, res) {

        const { storeData } = req.body;

        if (storeData.avatar) {
            const buffer = Buffer.from(storeData.avatar.replace(/^data:image\/(jpeg|png|jpg);base64,/, ''), 'base64')

            const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`
            try {
                const jimpres = await Jimp.read(buffer);
                jimpres.resize(100, Jimp.AUTO).write(path.resolve(__dirname, `../storage/${imagePath}`))
            } catch (error) {
                throw new Error
            }

            const user = await User.findOne({ number: storeData.number })
            if (user) {
                user.avatar = `${process.env.BASE_URL}/storage/${imagePath}`
                user.username = storeData.username
                user.isActivated = true
                user.save()
                const token = Services.generateJWToken({ _id: user._id, name: user.username })
                res.send({ message: 'activated', token })
            }
        }
        else {
            const user = await User.findOne({ number: storeData.number })
            if (user) {
                user.avatar = storeData.imageUrl
                user.username = storeData.username
                user.isActivated = true
                user.save()
                const token = Services.generateJWToken({ _id: user._id, name: user.username })
                res.send({ message: 'activated', token })
            }

        }



    }

    async FindUser(req, res) {
        const { token } = req.body
        if (token) {
            const { _id } = jwt.decode(token, process.env.JWT_SECRET_KEY)
            const user = await User.findOne({ _id })
            if (user) {
                res.send({ message: 'valid', user })
            }
            else {
                console.log('else');
                res.send({ message: 'invalid' })
            }
        }

    }
}

module.exports = new UserController();