const router = require('express').Router()
const OTPController = require('./controllers/otp-controller')
const UserController = require('./controllers/user-controller')
const RoomController = require('./controllers/room-controller')
const AuthMiddleware = require('./middlewares/authMiddleware')

router.post('/api/sendOtp', OTPController.SendOTP)
router.post('/api/verifyotp', OTPController.VerifyOTP)
router.post('/api/activate', UserController.ActivateUser)
router.post('/api/verify', UserController.FindUser)
router.post('/api/room-verify', RoomController.RoomUser)
router.post('/api/createRoom', RoomController.CreateRoom)
router.post('/api/get-room-data', RoomController.fetchRoomData)
router.get('/api/get-all-rooms', RoomController.fetchAllRooms)

module.exports = router