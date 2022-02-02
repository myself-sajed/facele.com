import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import { setUserUsername } from './slices/userSlice';


const Username = ({ nextStep, backStep }) => {

    const dispatch = useDispatch();
    const cardContent = {
        heading: 'Get Username',
        subHeading: "Get your username on faceless.com",
        buttonName: 'Get Avatar '
    }

    const storeUsername = useSelector((state) => (state.user.username))
    const [userName, setUserName] = useState(storeUsername);

    function stageUsername() {
        if (userName) {
            dispatch(setUserUsername(userName));
            nextStep()
        }
        else {
            console.log('Please type a username first');
        }
    }

    return <div>
        <Card cardContent={cardContent}>
            <div className=" my-4 phone__div">
                <span className="input-group-text mx-1">@</span>
                <input type="text" placeholder="Type username..." value={userName}
                    onChange={(e) => { setUserName(e.target.value) }}
                    className="form-control phone__number" aria-label="Phone number" maxLength={25} />
            </div>
            <br />
            <button className="btn btn-secondary mt-2 px-3" onClick={backStep}>Go Back <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle mb-1 ms-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
            </svg></button>

            <button className="btn btn-primary px-3 mx-2 mt-2" onClick={stageUsername}>{cardContent.buttonName} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi mb-1 bi-arrow-right-circle-fill ms-2"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg></button>
        </Card>
    </div>;
};

export default Username;
