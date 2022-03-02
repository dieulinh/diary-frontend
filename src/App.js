import React, {useEffect, useState} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import Login from './components/Login';
import User from './services/User';
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = User.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const logOut = () => {
    User.signOut();
    setCurrentUser(null);
  }
  return (

    <div>
      <nav>
        { currentUser ?
        (<div className='navbar-end'>
          <Link to={`/notes`} className='navbar-item'>
            {currentUser.username} 's Note
          </Link>

          <Link to="/" className="navbar-item" onClick={logOut}>
            <span className="icon is-small mr-1">
              <i className="fas fa-sign-out-alt"></i>
            </span>
            Logout
          </Link>
        </div>
        ) : (
          <div className='navbar-end'>
            <Link to={`/login`} className='navbar-item'>
              Login
            </Link>
            <Link to={`/signup`} className='navbar-item'>
              Register
            </Link>
          </div>
        )
        }
      </nav>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/signup" element={<Register/>} />
        <Route exact path="/notes" element={<Notes/>} />
        <Route exact path="/:username/edit/:id" element={<EditNote/>} />
        <Route exact path="/:username/add" element={<AddNote/>} />
        <Route exact path="/login" element={<Login setCurrentUser={setCurrentUser}/>} >

        </Route>
      </Routes>

    </div>

  );
}

export default App;
