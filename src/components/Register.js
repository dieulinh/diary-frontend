import React, { useState } from 'react';
import User from '../services/User';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  }
  const onChangeEmail = (e) => {
    const username = e.target.value;
    setEmail(username);
  }
  const onChangePassword = (e) => {
    const username = e.target.value;
    setPassword(username);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    User.register(username, password, email)
    .then((response) => {

      setMessage("register successfully");
    },
    (err) => {
      const responseMessage = (err.response && err.response.data && err.response.data.message)||err.message||err.toString();
      setMessage(responseMessage);
    })
  }
  return (<div>
    <h2> Register component</h2>

    <form onSubmit={onSubmit}>
      {message && (
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
        <label className='label'>Email</label>
        <input className='input' name="email" type="text"
        value={email}
        onChange={onChangeEmail}
        required
        />
      </div>
      <div className='field'>
      <label className='label'>Username</label>
        <input className='input' name="password" type="password"
        value={password}
        onChange={onChangePassword}
        required
        />
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-fullwidth is-primary">
            Register
          </button>
        </div>
      </div>
    </form>
  </div>)
}

export default Register;