import React, { useState } from 'react';
import {
   Button,
   Container, Form, Spinner } from 'react-bootstrap';
import { userLogin } from '../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let result; // declare result variable outside the try-catch block
  
    try {
      setLoading(true); // Show loader when starting the login process
  


      



      const payload = {
        userEmail: UserName,
        userPassword: Password,
      };
  
      result = await userLogin(payload);
  
      if (result.success) {
        localStorage.setItem('userToken', result.data.userToken);
        // Redirect to dashboard first
        navigate('/dashboard');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error('An error occurred during login.');
    } finally {
      setLoading(false); // Hide loader when the login process is complete
  
      // Show success toast only when the login process is complete
      // and it was successful (not during the loading state or on error)
      setTimeout(()=>{
        if (result && result.success) {
          toast.success(result.message);
        }
      },2800)
    }
  };
  
  return (
    <div className='bg-login'>
      <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <div className='w-50'>
          <h1 className='text-danger text-center'>Login</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label className='text-danger' style={{ fontSize: '18px' }}>UserName</Form.Label>
              <Form.Control type='text' placeholder='Enter Your Name' value={UserName} style={{ outline: 'none', boxShadow: 'none' }} onChange={(e) => setUserName(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label className='text-danger' style={{ fontSize: '18px' }}>Password</Form.Label>
              <Form.Control type='password' placeholder='Enter Your Password' value={Password} style={{ outline: 'none', boxShadow: 'none' }} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <div className='text-center mt-3'>
              <Button type='submit' variant='danger' style={{ width: '30%' }} disabled={loading}>
              {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="mr-2" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>

            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
