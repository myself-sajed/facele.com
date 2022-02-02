import React, { useEffect, useState } from 'react';
import EnterOTP from "./EnterOTP";
import PhoneNumber from "./PhoneNumber";
import Username from "./Username";
import Avatar from "./Avatar";
import Activation from "./Activation";
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [component, setComponent] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const step = {
        1: PhoneNumber,
        2: EnterOTP,
        3: Username,
        4: Avatar,
        5: Activation
    }

    const Step = step[component]

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            Axios.post('http://localhost:4000/api/verify', { token })
                .then(res => {
                    if (res.data.message === 'valid') {
                        navigate('/rooms')
                        setLoading(false)
                    }
                    else {
                        setLoading(false)
                        console.log('user not logged in');
                    }
                })
        }
        else {
            setLoading(false)
        }
    }, [])

    useEffect(() => {

        return () => {

        }
    }, [])

    function nextStep() {
        setComponent(component + 1)

    }


    function backStep() {
        setComponent(component - 1)
    }

    return <div>
        {loading ? <h3 className="text-center">Please wait...</h3> : <Step nextStep={nextStep} backStep={backStep} />}
    </div>;
};

export default Login;
