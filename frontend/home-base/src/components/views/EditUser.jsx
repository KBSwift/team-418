import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../styles/AddFormStyles.css';

export default function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState({
    id: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/users/${id}`);
      const userData = result.data;
  
      // Ensure that password and confirmPassword fields are not null or undefined
      const updatedUser = {
        ...userData,
        password: userData.password || '',
        confirmPassword: userData.confirmPassword || '',
      };
  
      setUser(updatedUser);
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    let validate = true;
    const errorsCopy = { ...errors };
  
    // Validate username
    if (user.username && user.username.trim().length >= 4 && user.username.trim().length <= 20) {
      errorsCopy.username = '';
    } else {
      errorsCopy.username = 'Username must be between 4 and 20 characters.';
      validate = false;
    }
  
    // Validate email
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (user.email && emailValidation.test(user.email)) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'Invalid email format.';
      validate = false;
    }
  
    // Validate password
    if (user.password && user.password.trim().length >= 4 && user.password.trim().length <= 20) {
      errorsCopy.password = '';
    } else if (user.password) {
      errorsCopy.password = 'Password must be between 4 and 20 characters.';
      validate = false;
    }
  
    // Validate confirmPassword
    if (user.password === user.confirmPassword) {
      errorsCopy.confirmPassword = '';
    } else if (user.confirmPassword) {
      errorsCopy.confirmPassword = 'Passwords do not match.';
      validate = false;
    }
  
    setErrors(errorsCopy);
    return validate;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();

  const saveUser = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {

        const { id, username, email, password, confirmPassword } = user;
        // Create a payload without password fields if they are empty
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
  
        // Include password fields if they are not empty
        if (user.password && user.confirmPassword) {
          payload.password = user.password;
          payload.confirmPassword = user.confirmPassword;
        }
  
        const response = await axios.put(`http://localhost:8080/api/users/${id}`, payload);
        console.log(response.data);
        navigate('/edit'); // Redirect to user settings or another page
      } catch (error) {
        // Handle other errors
        console.error('Error:', error);
      }
    }
  };

  const cancelEdit = () => {
    navigate('/edit'); // Redirect to user settings or another page
  };

  return (
    <div>
      <form>
        <div>
          <input type="hidden" name="userId" id="userId" value={user.id} />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>
        <button className="btn btn-success mr-2" onClick={saveUser}>
          Save Changes
        </button>
        <button className="btn btn-secondary" onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
};