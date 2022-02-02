const express = require('express')
const router = require('./routes')
const app = express()
const { json } = require('express')
const cors = require('cors')
// const bodyParser = require('body-parser');
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
app.use('/storage', express.static('storage'))
app.use(express.json({ limit: '50mb' }));
const ACTIONS = require('./actions');
// Database Configuration

const URL = process.env.DATABASE_URL

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Database connection successful');
}).catch(err => console.log('Database connection failed'));

//socket connection

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

// router
app.use(cors())
app.use(json())
app.use(router)

// Sockets

const socketUserMapping = {};

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
        socketUserMapping[socket.id] = user;

        // new Map
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.ADD_PEER, {
                peerId: socket.id,
                createOffer: false,
                user,
            });

            socket.emit(ACTIONS.ADD_PEER, {
                peerId: clientId,
                createOffer: true,
                user: socketUserMapping[clientId],
            });
        });

        socket.join(roomId);
    });

    // Handle relay Ice
    socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
            peerId: socket.id,
            icecandidate,
        });
    });

    // Handle relay sdp ( session description )
    socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
            peerId: socket.id,
            sessionDescription,
        });
    });

    // Leaving the room

    const leaveRoom = ({ roomId }) => {
        const { rooms } = socket;

        Array.from(rooms).forEach((roomId) => {
            const clients = Array.from(
                io.sockets.adapter.rooms.get(roomId) || []
            );

            clients.forEach((clientId) => {
                io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
                    peerId: socket.id,
                    userId: socketUserMapping[socket.id]?.id,
                });

                socket.emit(ACTIONS.REMOVE_PEER, {
                    peerId: clientId,
                    userId: socketUserMapping[clientId]?.id,
                });
            });

            socket.leave(roomId);
        });

        delete socketUserMapping[socket.id];
    };
    socket.on(ACTIONS.LEAVE, leaveRoom);
    socket.on('disconnecting', leaveRoom);
});

const PORT = 4000

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
