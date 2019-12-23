import React from 'react';
import './error.css'
import img from './error.png';

const Error = () => {
    return (
        <>
            <img src={img} alt="img"/>
            {/*<img src={process.env.PUBLIC_URL + '/img/error.png'} alt="img"/> -- вариант подключения картинки*/}
            <span>Error! Oooppss.</span>
        </>

    )
};

export default Error;