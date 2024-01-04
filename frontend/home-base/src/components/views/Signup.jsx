import React, {useState} from 'react';
import HomeBase from '../../assets/HomeBase.svg';
import { Link } from 'react-router-dom';
import '../styles/SignupStyles.css';

export default function Signup() {
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleNameChange = (event) => {
        const newName = event.target.value;
        
        
            if (/[^a-zA-Z0-9 ]/.test(newName) || newName.length < 4 || newName.length > 20) {
                alert("No special char/name bt 4-20 char");
                return;
            }
            setName(newName);
        
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const isValidEmail = (email) => {
        const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailValidation.test(email);
    }

    const handleSubmit = (event) => {

        if (/[^a-zA-Z0-9 ]/.test(newName) || newName.length < 4 || newName.length > 20) {
            alert("No special char/name bt 4-20 char");
            event.preventDefault();
            return;
        }

        setFormSubmitted(true);

        if (!isValidEmail(email)) {
            alert("Invalid email format");
        } else if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else {
            alert("Form submitted");
        }
        event.preventDefault();
    }

    return (
        <div className='App'>
            <form onSubmit={handleSubmit}>
                <div className="formInfo">
                    <label>
                        Name:
                        {/* <input type="text" value={name} onChange={handleNameChange} /> */}
                        <input type="text" />
                    </label>
                </div>
                <div className="formInfo">
                    <label>
                        Email:
                        <input type="email"  value={email} onChange={handleEmailChange}/>
                    </label>
                </div>
                <div className="formInfo">
                    <label>
                        Password:
                        <input type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                </div>
                 <div className="formInfo">
                    <label>
                        Confirm Password:
                        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    </label>
                </div>
                    <input type="submit" value="Submit" />
            </form>
        </div>
    );
}


