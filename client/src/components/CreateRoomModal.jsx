import React, { useState } from 'react';
import '../css/CreateRoomModal.css'


const CreateRoomModal = ({ closeModal, createRoom }) => {


    const [roomType, setRoomType] = useState('Open');
    const [roomTopic, setRoomTopic] = useState('');

    function sendRoomInfo() {
        if (!roomTopic) {
            console.log('Please enter room topic');
            return false;
        }
        const roomData = { roomType, roomTopic }
        createRoom(roomData)
        closeModal()
    }

    return <div className="modal__wrapper">
        <div className="modal__body">
            <button className="close" onClick={closeModal}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg></button>
            <div className="mb-3 topic__input">
                <h5 className="text-center">Enter the topic to be discussed</h5>
                <input type="search" value={roomTopic} maxLength={75} onChange={(e) => { setRoomTopic(e.target.value) }} />
                <p className="text-muted mx-2">Topic must short and brief. Only 75 character are allowed.</p>
            </div>
            <h5 className="text-center">Room type</h5>
            <div className="room__type">
                <div className={`image__div ${roomType === 'Open' ? 'active' : 'notactive'}`} onClick={() => setRoomType('Open')}>
                    <img src={'/images/pngs/worldwide.png'} alt="" />
                    <p>Open</p>
                </div>
                <div className={`image__div ${roomType === 'Social' ? 'active' : 'notactive'}`} onClick={() => setRoomType('Social')}>
                    <img src={'/images/pngs/team.png'} alt="" />
                    <p >Social</p>
                </div>
                <div className={`image__div ${roomType === 'Private' ? 'active' : 'notactive'}`} onClick={() => setRoomType('Private')}>
                    <img src={'/images/pngs/lock.png'} alt="" />
                    <p>Private</p>
                </div>


            </div>
            <hr />
            <div className="text-center">
                <p>Start a room, open to everyone!</p>
                <button className="btn mx-auto btn-success" onClick={sendRoomInfo}> <img src={'/images/pngs/confetti.png'} alt="" /> Let's GO</button>
            </div>
        </div>
    </div>;
};

export default CreateRoomModal;
