
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Button, Card, Col, Container, Dropdown, Modal, Pagination, Row, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addUser, deleteUser, getUsers, updateUser } from '../services/userService';
import { LineWave } from 'react-loader-spinner';
const User = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({
    attribute: 'Select User',
    value: '',
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [id, setId] = useState('');
  const [status, setStatus] = useState(false);

  const [payload, setPayload] = useState({
    userName: '',
    userType: '',
    userEmail: '',
  });

  const reset = () => {
    setId('');
    setPayload({
      userName: '',
      userType: '',
      userEmail: '',
    });
  };

  const [filterData, setFilterData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const userPerPage = 10;

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;

  const currentUser = filterData.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(filterData.length / userPerPage); i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data.data); // Use data.data to access the array
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
      users.filter((item) => {
        if (filter.attribute === 'Select User' || filter.value === '') {
          // No filtering applied, return all users
          return true;
        } else {
          // Filtering based on selected attribute and value
          const lowerCaseFilter = filter.value?.toLowerCase().trim();
  
          if (filter.attribute === 'userType') {
            // Filter based on userType
            const userType = item.userType?.toLowerCase();
            const matchesUserType = userType === lowerCaseFilter;
            console.log('Matches UserType:', matchesUserType);
            return matchesUserType;
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
  }, [filter.value, filter.attribute, users]);

  
  const insertData = async () => {
    try {
      const value = await addUser(payload);
  
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
      const data = await getUsers();
      setUsers(data.data); // Use data.data to access the array
      setStatus(true);
    } catch (error) {
      console.error('Error in getdata:', error.message);
    }
  };

 

  const updateData = async () => {
    try {
      const stringValue = id.toString();
  
      const value = await updateUser(stringValue, payload);
      console.log(value);
  
      if (value && value.status === 200) {
        toast.success(value.message);
      } else {
        toast.error(value?.message || 'Failed to update user.');
      }
  
      setFilter({ ...filter, value: '' });
      getdata();
      reset();
    } catch (error) {
      console.error("Error in updateData:", error.message);
      toast.error('An error occurred while updating the user.');
    }
  };
  
  

  const deleteData = async () => {
    try {
      const data = await deleteUser(id);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      setFilter({ ...filter, value: '' });
      getdata();
      reset();
    } catch (error) {
      console.error('Error in deleteData:', error.message);
    }
  };

  

  return (
    <>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="main-content">
          <Container>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h1 className="text-danger">Users</h1>
              <Button
                type="submit"
                variant="danger"
                onClick={() => {
                  setShowCreateModal(true);
                }}
              >
                Add User
              </Button>
            </div>
            <Card>
              <Card.Body>
                <Row>
                  <Col className="d-flex">
                    <Dropdown>
                      <Dropdown.Toggle>
                        {filter.attribute !== 'userType' ? 'Select User' : filter.value}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            setFilter({ ...filter, attribute: 'userType', value: 'user' })
                          }
                        >
                          user
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            setFilter({ ...filter, attribute: 'userType', value: 'provider' })
                          }
                        >
                          provider
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <input
                      type="text"
                      placeholder="Search Users...."
                      style={{ marginLeft: '20px', borderRadius: '5px', outline: 'none' }}
                      onChange={(e) => setFilter({ ...filter, attribute: 'userName', value: e.target.value })}
                    />
                  </Col>
                </Row>
                {!status ? (
                  <LineWave />
                ) : filterData.length === 0 ? (
                  <p>No users found.</p>
                ) : 
                (
                  <Table responsive striped bordered style={{ marginTop: '10px' }}>
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Usertype</td>
                        <td>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUser.map((item, index) => (
                        <tr key={index}>
                          <td>{item.userName}</td>
                          <td>{item.userEmail}</td>
                          <td>{item.userType}</td>
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
                    Showing {currentUser.length} - {filterData.length} users
                  </div>
                  <Pagination>
                    <Pagination.Prev
                      onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
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
                          Math.min(prevPage + 1, Math.ceil(filterData.length / userPerPage))
                        )
                      }
                      disabled={currentPage === Math.ceil(filterData.length / userPerPage)}
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
                <Modal.Title>{showCreateModal ? 'Add' : 'Update'} User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                 
                  <Row className="inputrow">
  <Col className="mb-3">
    <label>User Type</label>
    <select
      value={payload.userType}
      onChange={(e) => {
        setPayload({ ...payload, userType: e.target.value });
      }}
    >
      <option value="">Select User Type</option>
      <option value="user">User</option>
      <option value="provider">Provider</option>
    </select>
  </Col>
</Row>


                  <Row>
                    <Col className="mb-3">
                      <label>Name</label>
                      <input
                        name="userName"
                        type="text"
                        placeholder="UserName"
                        value={payload.userName}
                        onChange={(e) => setPayload({ ...payload, userName: e.target.value })}
                      />
                    </Col>
                    <Col className="mb-3">
                      <label>Email</label>
                      <input
                        name="userEmail"
                        type="text"
                        placeholder="Email"
                        value={payload.userEmail}
                        onChange={(e) => setPayload({ ...payload, userEmail: e.target.value })}
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
  );
};

export default User;
