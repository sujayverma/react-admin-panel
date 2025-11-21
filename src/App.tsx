import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './secure/Dashboard';
import Users from './secure/users/Users';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './public/Login';
import Register from './public/Register';
import { AuthProvider } from './context/authContext';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <AuthProvider user={null}> 
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user" element={<Users />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={ <Register />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
