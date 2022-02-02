const jwt = require('jsonwebtoken');
const User = require('../models/user')

function authMiddleware(req, res, next) {
    const { token } = req.body;
    try {
        const { _id } = jwt.decode(token, process.env.JWT_SECRET_KEY)
        User.findOne({ _id: _id })
            .then((user) => {
                if (user) {
                    next()
                }
                else {
                    res.send({ message: 'invalid' })
                }
            })
    } catch (err) {
        res.send({ message: 'invalid' })
    }
}

module.exports = authMiddleware