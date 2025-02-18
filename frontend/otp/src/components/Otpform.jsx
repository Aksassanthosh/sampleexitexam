import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const Otpform = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail'); 
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            navigate('/');  
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/otps/verifyotp', { email, otp });
            if (response.data.success) {
                navigate('/welcome');  
            } else {
                alert('Invalid OTP');
            }
        } catch (error) {
            alert('Error verifying OTP');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: "30%" }}>
            <label>Enter OTP</label>
            <TextField 
                type="text" 
                placeholder='Enter OTP' 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                required 
            /><br /><br />
            <Button variant="contained" type="submit" style={{ marginLeft: "25%" }}>
                Verify OTP
            </Button>
        </form>
    );
};

export default Otpform;
