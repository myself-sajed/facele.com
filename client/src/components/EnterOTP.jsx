import React, { useEffect, useState } from 'react';
import Card from './Card';
import '../css/PhoneNumber.css'
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setIsActivated, setUserNumber } from './slices/userSlice';
import { setIsAuth } from './slices/authSlice';
import { setLogin } from './slices/loginSlice'


const EnterOTP = ({ nextStep, backStep }) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const data = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const cardContent = {
        heading: 'Verify OTP',
        subHeading: 'Please enter the OTP we just sent you. ',
        buttonName: 'Verify and Proceed '
    }

    useEffect(() => {

        return () => { }; // cleanup toggles value, if unmounted
    }, []);

    const [inputOtp, setInputOtp] = useState('');

    //verify otp
    function verifyOtp() {
        const storeData = {
            data, inputOtp
        }

        setLoading(true);

        Axios.post('http://localhost:4000/api/verifyotp', { data: storeData })
            .then(function (res) {
                if (res.data.message === 'valid') {
                    dispatch(setUserNumber(data.number))
                    dispatch(setIsAuth(true))
                    dispatch(setIsActivated(res.data.user.isActivated))
                    dispatch(setLogin(Math.floor((Math.random() * 100000) + 1)))
                    nextStep()
                    setLoading(false);

                }
                else if (res.data.message === 'valid&userexists') {
                    if (res.data.user.isActivated === true) {
                        localStorage.setItem('token', res.data.token)
                        dispatch(setUserNumber(data.number))
                        dispatch(setIsAuth(true))
                        dispatch(setIsActivated(res.data.user.isActivated))
                        dispatch(setLogin(Math.floor((Math.random() * 100000) + 1)))
                        navigate('/rooms')
                    }
                    else {
                        nextStep()
                        dispatch(setUserNumber(data.number))
                        dispatch(setIsAuth(true))
                        dispatch(setIsActivated(res.data.user.isActivated))
                        dispatch(setLogin(Math.floor((Math.random() * 100000) + 1)))

                    }

                    setLoading(false);
                }
                else if (res.data.message === 'invalid') {
                    console.log('wrong otp entered');
                    setLoading(false);
                }
            }).catch(function (err) {
                console.log('Something went wrong', err.message);
                setLoading(false);

            })

    }

    return <div>
        <Card cardContent={cardContent}>
            <div className=" my-4 phone__div">
                <span className="input-group-text mx-1">4 Digit OTP</span>

                <input type="text" placeholder="OTP" maxLength={4}
                    onChange={(e) => { setInputOtp(e.target.value) }}
                    value={inputOtp} className="form-control input-group-text phone__number" aria-label="OTP" />
            </div>
            <br />


            <button className="btn btn-secondary px-3 mt-2" onClick={backStep}>Go Back <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle mb-1 ms-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
            </svg></button>


            {loading ? <button className="btn btn-primary px-3 mx-2 mt-2" type="button" disabled>
                <span className="spinner-grow spinner-grow-sm mx-2" role="status" aria-hidden="true"></span>
                Verifying...
            </button>
                :
                <button className="btn btn-primary px-3 mx-2 mt-2" onClick={verifyOtp}>{cardContent.buttonName} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi mb-1 bi-arrow-right-circle-fill ms-2"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg></button>

            }
        </Card>
    </div>;
};

export default EnterOTP;
