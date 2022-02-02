const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Services = require('../services/services')
const Room = require('../models/room')


class RoomController {

    async RoomUser(req, res) {
        const { token } = req.body
        if (token) {
            const { _id } = jwt.decode(token, process.env.JWT_SECRET_KEY)
            try {
                const user = await User.findOne({ _id })
                if (user) {
                    res.send({ message: 'valid', user })

                } else {
                    res.send({ message: 'invalid' })
                }

            } catch (error) {
                console.log('invalid');
                res.send({ message: 'invalid' })
            }
        }
    }

    CreateRoom(req, res) {
        const { roomData } = req.body;
        console.log(roomData);
        try {
            const room = new Room({
                roomType: roomData.roomType,
                roomTopic: roomData.roomTopic,
                ownerId: roomData.ownerId,
                ownerUsername: roomData.ownerUsername,
                speakers: [roomData.ownerId]
            })

            room.save()
            res.send({ message: 'success', room })

        } catch (error) {
            res.send({ message: 'error' })
        }
    }

    async fetchRoomData(req, res) {
        const { roomId } = req.body
        if (roomId) {
            const fetchedRoom = await Room.findOne({ _id: roomId })
            console.log('Fetched room : ', fetchedRoom);
            if (fetchedRoom) {
                res.send({ message: 'success', fetchedRoom })
            }
            else {
                res.send({ message: 'error' })
            }
        }
        else {
            res.send({ message: 'error' })
        }

    }

    async fetchAllRooms(req, res) {

        const fetchedRooms = await Room.find({}).populate('ownerId').populate('speakers').exec()
        if (fetchedRooms) {
            const rooms = fetchedRooms.reverse()

            res.send({ message: 'success', rooms })
        }
        else {
            res.send({ message: 'error' })
        }

    }
}

module.exports = new RoomController()