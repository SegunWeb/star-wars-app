import React from 'react';
import {Redirect} from 'react-router-dom';

const SecretPage = ({isLoggedIn}) => {

    if(isLoggedIn) {
        return (
            <div className='jumbotron text-center'>
                <h3>This page is full of secrets!!</h3>
                <img src="https://wp-assets.futurism.com/2019/11/tesla-cybertruck-deal.png" alt="img"/>
            </div>
        );
    }

    return <Redirect to='/login'/>;
};

export default SecretPage;