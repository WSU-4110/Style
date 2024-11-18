"use client";
import { useState, useEffect } from 'react';


const MyPage = () => {
    const [message, setMessage] = useState('');


    useEffect(() => {
        // Make API call to Django backend
        fetch('http://127.0.0.1:8000/')
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};
export default MyPage;