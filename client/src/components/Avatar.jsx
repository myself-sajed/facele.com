import React from 'react';
import Card from './Card';
import '../css/Avatar.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
// import { setUserAvatar, setImageUrl } from '../slices/userSlice';
import { setUserAvatar, setImageUrl } from './slices/userSlice'


const Avatar = ({ nextStep, backStep }) => {


    const username = useSelector((state) => state.user.username)
    const avatar = useSelector((state) => state.user.avatar)
    const imageUrl = useSelector((state) => state.user.imageUrl)
    const dispatch = useDispatch()


    const cardContent = {
        heading: `Hello, ${username}`,
        subHeading: "How's this Avatar?",
        buttonName: 'Activate Account'
    }


    const galleryImage = imageUrl || `/images/avatar/${Math.floor(Math.random() * 6) + 1}.jpg`
    dispatch(setImageUrl(galleryImage))

    const [image, setImage] = useState(avatar ? avatar : galleryImage);


    // capture and show image in realtime
    function captureImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result)
            dispatch(setUserAvatar(reader.result));
        }
    }

    function activate() {
        if (avatar) {
            nextStep()
        }
        else {
            dispatch(setImageUrl(galleryImage))
            nextStep()
        }

    }



    return <div>
        <Card cardContent={cardContent}>

            <img src={image} className="avatar mx-auto" alt="" />
            <div className="choose__avatar">
                <input type="file" id="avatar__input" onChange={captureImage} />
                <label htmlFor="avatar__input" id="lable__input"  >Choose a different avatar from gallery</label>
            </div>
            <br />
            <button className="btn btn-secondary px-3" onClick={backStep}>Go Back <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle mb-1 ms-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
            </svg></button>
            <button className="btn btn-primary mx-2 px-3 mt-0" onClick={activate}>{cardContent.buttonName} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi mb-1 bi-arrow-right-circle-fill ms-2"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg></button>

        </Card>
    </div>;
};

export default Avatar;
