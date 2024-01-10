import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                email: email,
                password: password,
            }, {
                auth: {
                    username: email,
                    password: password,
                },
            }, {withCredentials: true});

            if (response.status === 200) {
                login(response.data);
                navigate('/edit');
            } else {
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
            <small>Don't have an account? Register <a href={"/signup"}>here</a>.</small>
        </div>
    );
}


