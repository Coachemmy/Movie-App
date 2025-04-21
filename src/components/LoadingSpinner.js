import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Spinner animation="border" variant="light" className='text-7xl' />
        </div>
    );
};

export default LoadingSpinner;