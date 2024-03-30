import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import HomeScreen from './Screens/HomeScreen';
import BookingScreen from './Screens/BookingScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/home' element={<HomeScreen />} />
          <Route path="/book/:roomId/:fromDate/:toDate" element={<BookingScreen />} /> 
          <Route path='/register' exact element={<RegisterScreen />} />
          <Route path='/login' exact element={<LoginScreen/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;




