import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';


const Welcome = () => {

    const cardContent = {
        heading: 'Welcome to faceless.com',
        subHeading: 'Drop in Audio Chat',
        buttonName: 'Proceed '
    }

    const navigate = useNavigate()

    function goToOtpStep() {
        navigate('/login')
    }

    return (
        <>
            <Card cardContent={cardContent} >
                On faceless.com you can create rooms for talking different people on different topics without even revealing you face.
                <br />
                <button className="btn btn-primary px-3 mt-5" onClick={goToOtpStep}>{cardContent.buttonName}

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi mb-1 bi-arrow-right-circle-fill ms-2"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg></button>

            </Card>


        </>
    )
};

export default Welcome;
