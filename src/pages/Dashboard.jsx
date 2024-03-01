import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { androidUser, iosUser, totalUser, webUser } from '../services/userService'
import LoadingSpinners from '../components/Spinner'
const Dashboard = () => {

  const [totalUsers,setTotalUsers]=useState(null);
  const [androidUsers,setAndroidUsers]=useState(null);
  const [iosUsers,setIosUsers]=useState(null);
  const [webUsers,setWebUsers]=useState(null);

  const [loading,setLoading]=useState(true);

  useEffect(()=>{
 
    const fetchUsers=async()=>{
try {

  const totalUsersResult=await totalUser();
  console.log(totalUsersResult);
  setTotalUsers(totalUsersResult.data);

  const totalAndriodResult=await androidUser();
  setAndroidUsers(totalAndriodResult.data);

  const totalIosResult=await iosUser();
  setIosUsers(totalIosResult.data);

  const totalWebResult=await webUser();
  setWebUsers(totalWebResult.data);

  
  // Simulate a delay for 3 seconds before displaying the dashboard content
  await new Promise((resolve) => setTimeout(resolve, 1000));
} catch (error) {
  console.error('An error occurred during API calls:', error.message);

}finally{
  // Set loading to false when the API calls are complete
  setLoading(false);
}

    }
    fetchUsers();

  },[]);

  if(loading){
    return <LoadingSpinners />
  }
  return (
    <>
        <Header/>
        <div className='d-flex'>
        <Sidebar/>
        <div className='main-content'>
          
    <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
      <Row>
        <Col md={6} className='mb-3'>
          <Card  className='h-100 d-flex flex-column justify-content-center align-items-center'>
            <Card.Body className='d-flex flex-column align-items-center'>
              <i className="fas fa-user mb-2"></i>
              <Card.Title className='text-danger'>
                Total Users
              </Card.Title>
              <Card.Text className='text-danger'>
                {/* Total no.of users */}
                {totalUsers}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className='mb-3'>
          <Card className='h-100 d-flex flex-column justify-content-center align-items-center'>
            <Card.Body className='d-flex flex-column align-items-center'>
            <i className="fab fa-android mb-2" aria-hidden="true"></i>
              <Card.Title className='text-danger'>
                Android Users
              </Card.Title>
              <Card.Text className='text-danger'>
                {/* Total no.of android users */}
                {androidUsers}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className='mb-3'>
          <Card className='h-100 d-flex flex-column justify-content-center align-items-center'>
            <Card.Body className='d-flex flex-column align-items-center'>
            <i className="fab fa-apple mb-2" aria-hidden="true"></i>
              <Card.Title className='text-danger'>
                iOS Users
              </Card.Title>
              <Card.Text className='text-danger'>
                {/* Total no.of iOS users */}
                {iosUsers}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className='mb-3'>
          <Card className='h-100 d-flex flex-column justify-content-center align-items-center'>
            <Card.Body className='d-flex flex-column align-items-center'>
              <i className="fa fa-globe mb-2" aria-hidden="true"></i>
              <Card.Title className='text-danger'>
                Web Users
              </Card.Title>
              <Card.Text className='text-danger'>
                {/* Total no.of web users */}
                {webUsers}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
        </div>
        </div>
    </>
  )
}

export default Dashboard