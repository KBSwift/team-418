import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [email, checkEmail] = useState('');
    const [password, checkPassword] = useState('');

    const handleEmailCheck = (event) => {
        checkEmail(event.target.value);
    };

    const handlePasswordCheck = (event) => {
        checkPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5173', {  //need to change to what is being hosted with the data 
                email,
                password,
            });

            console.log("Test", response.data.message);

            if (response.data.success) {
                window.location.href = '/edit';
            } else {
                console.error('Email or Password do not match', response.data.message);
            }
        } catch (error) {
            console.error('Error has occured', error.response.data.message);
        }
    };

    return (
        <div className='App'>
            <form onSubmit={handleSubmit}>
                <div className="formInfo">
                    <label>
                        Email:
                        <input type="email"  value={email} onChange={handleEmailCheck}/>
                    </label>
                </div>
                <div className="formInfo">
                    <label>
                        Password:
                        <input type="password" value={password} onChange={handlePasswordCheck} />
                    </label>
                </div>
                    <input type="submit" value="Submit" />
            </form>
        </div>
    );
}


