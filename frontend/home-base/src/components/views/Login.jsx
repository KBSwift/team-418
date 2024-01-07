import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                email: email,
                password: password,
            });
            console.log(response.data);

            if (response.status === 200) {
                // Navigate to '/edit' on successful login
                navigate('/edit');
            } else {
                // Show an alert for incorrect credentials
                alert('Email or Password do not match');
            }
            
        } catch (error) {
            console.error('Error has occured', error.response.data.message);
            alert('An error has occurred while logging in.')
        }
        
    };

    return (
        <div className='App'>
            <form onSubmit={handleSubmit}>
                <div className="formInfo">
                    <label>
                        Email:
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                </div>
                <div className="formInfo">
                    <label>
                        Password:
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                    <input type="submit" value="Submit" />
            </form>
        </div>
    );
}


