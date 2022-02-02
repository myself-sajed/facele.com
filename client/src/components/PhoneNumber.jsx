import React, { useState } from 'react';
import Card from './Card';
import '../css/PhoneNumber.css'
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { useDispatch } from 'react-redux'
import { setAuth } from './slices/authSlice';

const PhoneNumber = ({ nextStep }) => {
    const numberFromStore = useSelector((state) => state.auth.number)
    const dispatch = useDispatch()

    const cardContent = {
        heading: 'Login/Register',
        subHeading: 'Please enter your phone number',
        buttonName: 'Get OTP'
    }

    const [number, setNumber] = useState(numberFromStore);
    function sendOtpToClient(n) {

        if (n) {
            Axios.post('http://localhost:4000/api/sendOtp', { number: n })
                .then(function (res) {
                    if (res.data.message === 'success') {
                        console.log(res.data.response);
                        dispatch(setAuth(res.data.response))
                        nextStep()
                    }
                }).catch(function (err) {
                    console.log('error while sending OTP', err);
                })
        }
        else {
            console.log('Enter a valid 10 digit Mobile number');
        }

    }

    return <div>
        <Card cardContent={cardContent}>
            <div className=" my-4 phone__div">
                <span className="input-group-text">IN</span>
                <span className="input-group-text mx-1">+91</span>
                <input type="text" placeholder="Phone No" value={number}
                    onChange={(e) => { setNumber(e.target.value) }}
                    className="form-control phone__number" aria-label="Phone number" maxLength={10} />
            </div>
            <br />
            <button className="btn btn-primary px-3 mt-2" onClick={() => { sendOtpToClient(number) }}>{cardContent.buttonName} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi mb-1 bi-arrow-right-circle-fill ms-2"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg></button>
        </Card>
    </div>;
};

export default PhoneNumber;
