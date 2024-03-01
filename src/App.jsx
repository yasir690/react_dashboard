import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Error from './pages/Error';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Vehicle from './pages/Vehicle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  toastClassName="custom-toast"
/>

      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/*' element={<Error />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/users' element={<User />} />
          <Route path='/vehicles' element={<Vehicle />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
