import React, { useEffect, useState } from 'react';
import '../css/Navbar.css'
import { Link, } from 'react-router-dom'
import Axios from 'axios'
import { useSelector } from 'react-redux';


const Navbar = ({ title }) => {

    const [isAuth, setIsAuth] = useState(null);
    const [user, setUser] = useState(null);
    const auth = useSelector((state) => state.login.isLoggedIn)
    title = auth

    function logoutUser() {
        localStorage.clear();
        setIsAuth(false);
    }


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            Axios.post('http://localhost:4000/api/verify', { token })
                .then(res => {
                    if (res.data.message === 'valid') {
                        setIsAuth(true)
                        setUser(res.data.user)
                    }
                    else {
                        setIsAuth(false)
                    }
                })
        }
        else {
            setIsAuth(false)
        }
    }, [isAuth, title]);



    return <div>
        <nav className="navbar navbar-expand-lg my-3">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="currentColor" className="bi bi-soundwave mb-1"><path fillRule="evenodd" d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5zm-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zm12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5z" /></svg>Faceless</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {!isAuth ?

                        null : <>
                            <ul className="navbar-nav">

                                <li className="nav-item">
                                    <Link to="/rooms" className="nav-link" aria-current="page" >Rooms</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/your-rooms" className="nav-link" aria-current="page" >Your Rooms</Link>
                                </li>


                            </ul>
                            <div className="image__container me-5">
                                {user &&
                                    <div className="dropdown ">
                                        <img src={user.avatar} alt="avatar" className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" />

                                        <ul className="dropdown-menu bg-dark " aria-labelledby="dropdownMenuButton1">
                                            <li className="dropdown-item text-white bg-dark"> {user && user.username}</li>

                                            <li><Link to="/login" className="nav-link text-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Logout from faceless" onClick={logoutUser} aria-current="page" >Logout<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right  mb-1 mx-2" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                            </svg></Link></li>
                                        </ul>
                                    </div>}



                            </div>
                        </>}

                </div>

            </div>
        </nav>
    </div>;
};

export default Navbar;
