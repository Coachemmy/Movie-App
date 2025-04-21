import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaVideo } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

const SplashPage = () => {
    const navigate = useNavigate();
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const fadeOutTimer = setTimeout(() => {
            setFadeOut(true);
        }, 4000);

        const navigateTimer = setTimeout(() => {
            navigate('/home');
        }, 5000);

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(navigateTimer);
        };
    }, [navigate]);

    return (
        <div className={`flex flex-col items-center justify-center text-center font-bold text-white h-screen bg-black transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>          
                <FaVideo className="text-6xl  mb-4"/>             
                <h1 className="text-4xl">WELCOME TO MOVIE<span className='text-red-500'>ERS</span></h1>
                <h6 className="text-xl">Best at recommendation of tanterlizing movies</h6>    

                <BsThreeDots className="animate-ping text-6xl mt-4"/>                        
        </div>
    );
};

export default SplashPage;