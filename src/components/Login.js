import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../services/User';

const Login = ({setCurrentUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  }
  const navigate = useNavigate();
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    User.signin(username, password)
    .then(() => {
      setMessage("Login successfully");
      const user = User.getCurrentUser();
      console.log('user', user);
      navigate(`/notes`)
      setSuccessful(true);
    },
    (err) => {
      const responseMessage = (err.response && err.response.data && err.response.data.message)||err.message||err.toString();
      setMessage(responseMessage);
      setSuccessful(false);
    })
  }
  return (<div>
    <h2> Login</h2>

    <form onSubmit={onSubmit}>
      {message && successful &&(
        <div className='notification is-success is-light'>
          { message }
        </div>
      )}
      {message && !successful &&(
        <div className='notification is-danger is-light'>
          { message }
        </div>
      )}
      <div className='field'>
        <label className='label'>Username</label>
        <input className='input' name="username" type="text"
        value={username}
        onChange={onChangeUsername}
        required
        />
      </div>

      <div className='field'>
      <label className='label'>Password</label>
        <input className='input' name="password" type="password"
        value={password}
        onChange={onChangePassword}
        required
        />
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-fullwidth is-primary">
            Login
          </button>
        </div>
      </div>
    </form>
  </div>)
}

export default Login;