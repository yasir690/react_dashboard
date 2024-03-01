import React from 'react'
import '../App.css'
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate=useNavigate();
  return (
    <div className='bg-error'>
        <Container className='d-flex justify-content-center align-items-center' style={{minHeight:"100vh"}}>
         <div style={{fontSize:"24px",textTransform:"capitalize"}}>
         Oops !! 404 page not found click <span onClick={()=>navigate('/')} style={{cursor:"pointer",color:"red"}}>here</span> to redirect to login page 
         </div>
        </Container>
    </div>
  )
}

export default Error