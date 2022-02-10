import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Notes from './components/Notes';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/signup" element={<Register/>} />
        <Route exact path="/notes" element={<Notes/>} />
        <Route exact path="/login" element={<Login setCurrentUser={setCurrentUser}/>} >

        </Route>

      </Routes>
    </div>
  );
}

export default App;
