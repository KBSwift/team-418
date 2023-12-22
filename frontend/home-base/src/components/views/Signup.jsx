import React from 'react';
import HomeBase from '../../assets/HomeBase.svg';
import { Link } from 'react-router-dom';

export default function Signup() {
    
    const handleSubmit = (event) => {
       alert("Form submitted");
       event.preventDefault();
    }

    return (
        <div className='App'>
            <form onSubmit={handleSubmit}>
                <div className="formInfo">
                    <label>
                        Name:
                        <input type="text" />
                    </label>
                </div>
                <div className="formInfo">
                    <label>
                        Email:
                        <input type="email" />
                    </label>
                </div>
                <div className="formInfo">
                    <label>
                        Password:
                        <input type="password" />
                    </label>
                </div>
                    <input type="submit" value="Submit" />
            </form>
        </div>
    );
}