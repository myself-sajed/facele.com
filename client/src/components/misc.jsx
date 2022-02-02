import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios'
import { useEffect } from 'react';
import { useWebRTC } from '../hooks/useWebRTC';
import { useDispatch, useSelector } from 'react-redux'
import { setMyUser, } from './slices/userSlice';
import '../css/Room.css';
import '../css/Rooms.css'

const Room = () => {

    const dispatch = useDispatch()

    const [user, setUser] = useState(null);
    const [room, setRoom] = useState(null);
    const [error, setError] = useState(null);

    const { roomId } = useParams()
    const navigate = useNavigate()



    const newUser = useSelector((state) => state.user.myuser)
    const { clients, provideRef } = useWebRTC(roomId, newUser);
    console.log(clients);

    // Leave the room
    const handleManualLeave = () => {
        navigate('/rooms')
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            async function fetcher() {
                const res = await Axios.post('http://localhost:4000/api/room-verify', { token })
                if (res.data.message === 'valid') {
                    dispatch(setMyUser(res.data.user))
                    console.log(res.data.user);
                    setUser(res.data.user)
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

    useEffect(() => {
        async function fetcher() {
            const res = await Axios.post('http://localhost:4000/api/get-room-data', { roomId })

            // validation
            if (res.data.message === 'success') {
                setRoom(res.data.fetchedRoom)
                console.log(res.data.fetchedRoom);
            }
            else if (res.data.message === 'error') {
                setError("Sorry we coudn't find any room related to this URL. Please try again")
                console.log("Sorry we coudn't find any room related to this URL. Please try again");
            }
        }
        fetcher()
    }, [roomId])

    return <div className="main__div">
        {/* Navigation bar of Rooms Page */}
        <div className="room__navbar">
            <div className="left" onClick={handleManualLeave}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-left-circle mb-1" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg>
                <h4 className="ms-2">Go to all voice rooms</h4>

            </div>
            <p >
            </p>
        </div>
        {/* Navigation bar ends */}
        <div className='clientsWrap'>
            <div className="heading" >
                <div>
                    <h4 >{room?.roomTopic}</h4>
                    <hr />
                </div>
                <hr />

                <div className="hands">
                    <div>
                        <img className="hand__emoji" src="https://img.icons8.com/emoji/48/000000/hand-with-fingers-splayed-emoji.png" />
                    </div>

                    <div className="emoji__div" onClick={handleManualLeave}>
                        <img className="hand__emoji" src="https://img.icons8.com/emoji/48/000000/crossed-fingers-emoji.png" />
                        <span>Leave quietly</span>
                    </div>

                </div>
            </div>
            <div >
                {clients.map((client) => {
                    return (
                        <div key={client.id}>
                            <div className="client__div" >
                                <audio
                                    ref={(instance) =>
                                        provideRef(instance, client.id)
                                    }
                                    autoPlay
                                ></audio>
                                <div className="avatar__wrapper">
                                    <img
                                        className="avatar ms-3"
                                        src={client.avatar}
                                        alt="avatar"
                                    />
                                    <p className="text-center">{client.username}</p>
                                </div>

                                <div className="mic-button" >
                                    {/* on mic icon  */}
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-mic-fill mic mic-open" viewBox="0 0 16 16">
                                        <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                                        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                                    </svg> */}

                                    {/* Off mic icon  */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-mic-mute-fill mic mic-muted" viewBox="0 0 16 16">
                                        <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z" />
                                        <path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z" />
                                    </svg>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>;
};

export default Room;
