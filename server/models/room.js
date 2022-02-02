const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    roomTopic: { type: String, required: true },
    roomType: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    ownerUsername: { type: String, required: true, },
    speakers: {
        type: [
            { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }]
    },
}, { timestamps: true })

module.exports = mongoose.model('room', roomSchema)