import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

const NoMoviesFound = ({message}) => {
    return (
        <div className="flex flex-col items-center justify-center text-center h-screen">
            <AiFillCloseCircle className='text-7xl text-red-500 animate-bounce' />
            <div className="text-center text-white bold text-xl mb-20">{message}</div>
        </div>
    );
};

export default NoMoviesFound;
