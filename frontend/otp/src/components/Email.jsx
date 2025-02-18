import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const Email = () => {  
    const [email, setLocalEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/otps/sendotp', { email });
            localStorage.setItem('userEmail', email); 
            navigate('/otp');  
        } catch (error) {
            alert('Error sending OTP');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: "30%" }}>
            <label>Email</label>
            <TextField 
                type="email" 
                placeholder='Email' 
                value={email} 
                onChange={(e) => setLocalEmail(e.target.value)} 
                required 
            /><br /><br />
            <Button variant="contained" type="submit" style={{ marginLeft: "25%" }}>
                Send OTP
            </Button>
        </form>
    );
};

export default Email;
