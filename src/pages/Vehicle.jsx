import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Button, Card, Col, Container, Dropdown, Modal, Pagination, Row, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { LineWave } from 'react-loader-spinner';

import {addVehicle,getVehicles,updateVehicle,deleteVehicle} from '../services/vehicleService';


const Vehicle = () => {
    
  const [vehicles,setvehicles]=useState([]);
    
    const [filter,setfilter]=useState({
        attribute:"Select Vehicle",
        value:""
    });
    
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [id, setId] = useState('');
  const [status, setStatus] = useState(false);

  const [payload, setPayload] = useState({
    make: '',
    vehicleType: '',
    model: '',
  });

  const reset = () => {
    setId('');
    setPayload({
      make: '',
      vehicleType: '',
      model: '',
    });
  };

    const [filterData,setFilterData]=useState([]);

    const [currentPage,setCurrentPage]=useState(1);

    const vehiclePerPage=10;

    //index of last user

    const indexOfLastVehicle=currentPage * vehiclePerPage;

        //index of first user

    const indexOfFirstVehicle=indexOfLastVehicle-vehiclePerPage;

    // get users of current page

    const currentVehicles=filterData.slice(indexOfFirstVehicle,indexOfLastVehicle);

    const pageNumber=[];

    for (let i = 1; i <= Math.ceil(filterData.length / vehiclePerPage); i++) {
        pageNumber.push(i);
      }

      useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getVehicles()
            setvehicles(data.data); // Use data.data to access the array
            setStatus(true);
          } catch (error) {
            console.error('Error in fetchData:', error.message);
          }
        };
    
        fetchData();
      }, []);

      
  useEffect(() => {
    
    // Apply filtering logic
    setFilterData(
      vehicles.filter((item) => {
        if (filter.attribute === 'Select User' || filter.value === '') {
          // No filtering applied, return all users
          return true;
        } else {
          // Filtering based on selected attribute and value
          const lowerCaseFilter = filter.value?.toLowerCase().trim();
  
          if (filter.attribute === 'vehicleType') {
            // Filter based on userType
            const vehicleType = item.vehicleType?.toLowerCase();
            const matchesvehicleType = vehicleType === lowerCaseFilter;
            console.log('Matches vehicleType:', matchesvehicleType);
            return matchesvehicleType;
          } else {
            // Other attribute filtering
            const attributeValue = item[filter.attribute]?.toLowerCase();
            const matchesAttribute = attributeValue?.includes(lowerCaseFilter);
            console.log('Matches Attribute:', matchesAttribute);
            return matchesAttribute;
          }
        }
      })
    );
  }, [filter.value, filter.attribute, vehicles]);

  const insertData = async () => {
    try {
      const value = await addVehicle(payload);
  
      if (value && value.status === "1") {
        toast.success(value.message);
      } else if (value) {
        toast.error(value.message);
      } else {
        toast.error("Failed to add user. Please try again.");
      }
  
      getdata();
      reset();
    }
     catch (error) {
      console.error("Error in insertdata:", error);
  
      
    }
  };

  const getdata = async () => {
    try {
      const data = await getVehicles();
      setvehicles(data.data); // Use data.data to access the array
      setStatus(true);
    } catch (error) {
      console.error('Error in getdata:', error.message);
    }
  };

  const updateData = async () => {
    try {
      const stringValue = id.toString();
  
      console.log('Updating Vehicle:', stringValue, payload);
  
      const value = await updateVehicle(stringValue, payload);
      console.log('Update Response:', value);
  
      if (value && value.status === 200) {
        toast.success(value.message);
      } else {
        toast.error(value?.message || 'Failed to update vehicle.');
      }
  
      setfilter({ ...filter, value: '' });
      getdata();
      reset();
    } catch (error) {
      console.error("Error in updateData:", error.message);
      toast.error('An error occurred while updating the vehicle.');
    }
  };
  

  
  const deleteData = async () => {
    try {
      const data = await deleteVehicle(id);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      setfilter({ ...filter, value: '' });
      getdata();
      reset();
    } catch (error) {
      console.error('Error in deleteData:', error.message);
    }
  };

  return (
    <>
    <Header/>
        <div className='d-flex'>
        <Sidebar/>
        <div className='main-content'>
          <Container>
          <div className='d-flex align-items-center justify-content-between mb-3'>
              <h1 className='text-danger'>Vehicles</h1>
              <Button className='btn btn-danger'
              onClick={() => {
                setShowCreateModal(true);
              }}
              >Add Vehicle</Button>
            </div>
            <Card>
                <Card.Body>
                    <Row>
                        <Col className='d-flex'>
                            <Dropdown>
                                <Dropdown.Toggle>
                                    {
                                        filter.attribute !=='vehicleType'?'Select Vehicle':filter.value
                                    }
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>setfilter({...filter,attribute:"vehicleType",value:"car"})}>
                                        Car
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={()=>setfilter({...filter,attribute:"vehicleType",value:"van"})}>
                                        Van
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <input type="text" placeholder='Search Vehicles...' style={{marginLeft:"20px",borderRadius:"5px"}} onChange={(e)=>setfilter({...filter,attribute:"make",value:e.target.value})}/>
                        </Col>
                    </Row>

                    {!status ? (
                  <LineWave />
                ) : filterData.length === 0 ? (
                  <p>No vehicle found.</p>
                ) : 
                (
                  <Table responsive striped bordered style={{ marginTop: '10px' }}>
                    <thead>
                      <tr>
                        <td>Make</td>
                        <td>Model</td>
                        <td>vehicleType</td>
                        <td>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {currentVehicles.map((item, index) => (
                        <tr key={index}>
                          <td>{item.make}</td>
                          <td>{item.model}</td>
                          <td>{item.vehicleType}</td>
                          <td>
                            <div className="action">
                              <i
                                className="fas fa-edit"
                                onClick={() => {
                                  setId(item._id);
                                  setPayload(item);
                                  setShowUpdateModal(true);
                                }}
                              ></i>
                              <i
                                className="fas fa-trash"
                                onClick={() => {
                                  setId(item._id);
                                  setShowDeleteModal(true);
                                }}
                              ></i>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
                    <div className="d-flex justify-content-between pagi">
  <div>
    Showing{" "}
    {
      filterData?.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10)
        ?.length
    }
    - {filterData?.length} vehicles
  </div>
  <Pagination>
    <Pagination.Prev
      onClick={() =>
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
      }
      disabled={currentPage === 1}
    />
    {pageNumber.map((number) => (
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    ))}
    <Pagination.Next
      onClick={() =>
        setCurrentPage((prevPage) =>
          Math.min(prevPage + 1, Math.ceil(filterData.length / vehiclePerPage))
        )
      }
      disabled={currentPage === Math.ceil(filterData.length / vehiclePerPage)}
    />
  </Pagination>
</div>
                </Card.Body>
            </Card>
            <Modal
              show={showDeleteModal}
              onHide={() => {
                reset();
                setShowDeleteModal(false);
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex justify-content-center align-items-center">
                  <Button
                    variant="danger"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setId('');
                      setShowDeleteModal(false);
                    }}
                  >
                    No
                  </Button>
                  <Button
                    variant="primary"
                    className="ml-2"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setId('');
                      deleteData();
                      setShowDeleteModal(false);
                    }}
                  >
                    Yes
                  </Button>
                </div>
              </Modal.Body>
            </Modal>

            <Modal
              show={showCreateModal || showUpdateModal}
              onHide={() => {
                reset();
                setShowCreateModal(false);
                setShowUpdateModal(false);
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>{showCreateModal ? 'Add' : 'Update'} Vehicle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                 
                  <Row className="inputrow">
  <Col className="mb-3">
    <label>Vehicle Type</label>
    <select
      value={payload.vehicleType}
      onChange={(e) => {
        setPayload({ ...payload, vehicleType: e.target.value });
      }}
    >
      <option value="">Select vehicle Type</option>
      <option value="car">Car</option>
      <option value="van">Van</option>
    </select>
  </Col>
</Row>


                  <Row>
                    <Col className="mb-3">
                      <label>Make</label>
                      <input
                        name="make"
                        type="text"
                        placeholder="UserName"
                        value={payload.make}
                        onChange={(e) => setPayload({ ...payload, make: e.target.value })}
                      />
                    </Col>
                    <Col className="mb-3">
                      <label>Model</label>
                      <input
                        name="model"
                        type="text"
                        placeholder="Email"
                        value={payload.model}
                        onChange={(e) => setPayload({ ...payload, model: e.target.value })}
                      />
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setId('');
                    reset();
                    setShowCreateModal(false);
                    setShowUpdateModal(false);
                  }}
                >
                  Cancel
                </Button>
                {showCreateModal ? (
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => {
                      setId('');
                      reset();
                      setShowCreateModal(false);
                      setShowUpdateModal(false);
                      insertData();
                    }}
                  >
                    Create
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => {
                      setId('');
                      reset();
                      setShowCreateModal(false);
                      setShowUpdateModal(false);
                      updateData();
                    }}
                  >
                    Update
                  </Button>
                )}
              </Modal.Footer>
            </Modal>
          </Container>
        </div>
        </div>  
    </>
  )
}

export default Vehicle