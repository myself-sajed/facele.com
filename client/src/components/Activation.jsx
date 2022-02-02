import React, { useEffect } from 'react';
import Card from './Card';
import '../css/Loader.css'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { setIsAuth } from './slices/authSlice';
import { setLogin } from './slices/loginSlice'


const Activation = () => {

    const navigate = useNavigate()
    const cardContent = {
        heading: 'Account Activation',
        subHeading: "Account Activation is in progress...",
        buttonName: "You'll be automatically redirected"
    }
    const dispatch = useDispatch()

    const storeData = useSelector((state) => (state.user))
    useEffect(() => {
        Axios.post('http://localhost:4000/api/activate', { storeData })
            .then((res) => {
                if (res.data.message === 'activated') {
                    navigate('/rooms')
                    console.log('User activated successfully');
                    localStorage.clear()
                    dispatch(setIsAuth(true))
                    localStorage.setItem('token', res.data.token)
                    dispatch(setLogin(Math.floor((Math.random() * 100000) + 1)))
                }
                else if (res.data.message === 'error') {
                    console.log('Something went wrong while activating',);
                }
            }).catch((err) => {
                console.log('Activation error', err.message);
            })
    }, []);


    return <div>
        <Card cardContent={cardContent}>
            <div className="my-4 phone__div">
                <div className="loader"></div>
            </div>
            <br />
            <button className="btn btn-primary px-3 mt-2 disabled">{cardContent.buttonName} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi mb-1 bi-arrow-right-circle-fill ms-2"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg></button>
        </Card>
    </div>;
};

export default Activation;
