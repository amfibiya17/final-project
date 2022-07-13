import './signup.css';

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function signupUser(event) {
    event.preventDefault();

    let response;
    try {
      response = await axios.post('http://localhost:8282/users/signup', {
        name,
        email,
        password,
      });
    } catch {
      return null;
    }

    setName('');
    setEmail('');
    setPassword('');

    if (!response) {
      setError('Please ensure you have filled out the sign up form properly.');
    } else {
      navigate('/login');
    }
    return false;
  }

  return (
    <div className="body">

      <div className="Signup">

        <form onSubmit={signupUser}>

          <div className="input-container">
            <input
              className="input"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Full Name"
            />
          </div>

          <div className="input-container">
            <input
              className="input"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
            />
          </div>

          <div className="input-container">
            <input
              className="input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
          </div>
          <button className="login-button" data-cy="submit" type="submit">Sign up</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
