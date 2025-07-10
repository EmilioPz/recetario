import React from 'react';
import { ToastContainer } from 'react-toastify';

const ToastMessage = () => {
    return <ToastContainer position="top-center" autoClose={3000} hideProgressBar />;
};

export default ToastMessage;