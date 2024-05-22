import React, { useState } from 'react';

import { paisesAPI } from '../../services/api.js';

import '../../assets/css/Home.css'

export const Home = () => {
    const [paises, setPaises] = useState([]);
    paisesAPI()
    setPaises(localStorage.getItem("paises"))

    return (
        <>
            <header className="header">
                <span>Países</span>
            </header>
            {paises.map((item) => (
                <p>{item}</p>
            ))}
        </>
    )
}

export default Home;