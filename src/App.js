import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import './App.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/signup" element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
