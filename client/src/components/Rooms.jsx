import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Rooms.css'
import RoomCard from './RoomCard';
import CreateRoomModal from './CreateRoomModal';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux'
import { setMyUser, } from './slices/userSlice';

const Rooms = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState(null);
    const [modal, setModal] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            async function fetcher() {
                const res = await Axios.post('http://localhost:4000/api/room-verify', { token })
                if (res.data.message === 'valid') {
                    setUser(res.data.user)
                    dispatch(setMyUser(res.data.user))
                }

                else if (res.data.message === 'invalid') {
                    console.log('Something went wrong in the room');
                }
            }
            fetcher();

        } else {
            navigate('/login')
        }
    }, [])


    function closeModal() {
        setModal(false);
    }

    async function createRoom(roomData) {
        roomData.ownerId = user._id
        roomData.ownerUsername = user.username
        const res = await Axios.post('http://localhost:4000/api/createRoom', { roomData })

        // validations
        if (res.data.message === 'success') {
            console.log(res.data.room);
            console.log('Room created successfully');
            navigate(`/room/${res.data.room._id}`)
        }
        else if (res.data.message === 'error') {
            console.log('Something went wrong at the backend...');
        }
    }

    // fetching all the rooms in the database
    useEffect(() => {
        async function fetcher() {
            const res = await Axios.get('http://localhost:4000/api/get-all-rooms')

            if (res.data.message === 'success') {
                console.log(res.data.rooms);
                setRooms(res.data.rooms)

            }
            else {
                console.log('In error');
                setError(res.data.message)
            }
        }

        fetcher()
    }, [])

    useEffect(() => { }, [])


    return <div className="main__channel">
        <div className="main__section mt-4">

            {/* Navigation bar of Rooms Page */}
            <div className="room__navbar">
                <div className="left">
                    <h4>All voice rooms</h4>
                    <div className="search__wrapper mx-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search mx-2 mb-1" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                        <input type="search" size="40" />
                    </div>
                </div>
                <button className="btn btn-success" onClick={() => { setModal(true); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill mb-1" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                    </svg>
                    Create a room</button>
            </div>
            {/* Navigation bar ends */}

            {!user ? <div className="load"><Loader /></div>
                :



                <>
                    {/* All Cards section starts*/}

                    {
                        rooms ?
                            <div className="grid__container mt-4 ">
                                {rooms.map(function (room) {
                                    return <RoomCard key={room._id} roomData={room} />
                                })}
                            </div>
                            :

                            <>

                                <RoomCard />
                                <RoomCard />
                                <RoomCard />
                                <RoomCard />
                                <RoomCard />
                                <RoomCard />
                                <RoomCard />

                            </>

                    }


                    {/* Modal Starts here */}
                    {modal && <CreateRoomModal closeModal={closeModal} createRoom={createRoom} />}

                </>


            }
        </div>

    </div>
};

export default Rooms;
