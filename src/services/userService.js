import { Action } from "../config/action";


//user login 


export const userLogin=async(payload)=>{
   
    try {
        const userlogin = await Action.post('/userLogin', payload);
        console.log(userlogin);
        return userlogin.data;
    } catch (error) {
        console.log('Error:', error.message);
        if (error.response) {
            console.log('Server Response:', error.response.data);
        }
        throw error;
    }
}

// get total users

export const totalUser=async()=>{
    try {
        const authToken=localStorage.getItem('userToken');

        if(!authToken){
            console.log('auth token not found');
        }
        const totalusers=await Action.get('/countUser',{
            headers:{
                'x-access-token': authToken,
            }
        });
        console.log(totalusers);
        return totalusers.data;
    } catch (error) {
        console.log(error.message);
    }
}


//get android users

export const androidUser=async()=>{
    try {
        const authToken=localStorage.getItem('userToken');

        if(!authToken){
            console.log('auth token not found');
        }
        const androidusers=await Action.get('/androiduser',{
            headers:{
                'x-access-token': authToken,
            }
        });
        console.log(androidusers);
        return androidusers.data;
    } catch (error) {
        console.log(error.message);
    }
}

//get ios users

export const iosUser=async()=>{
    try {
        const authToken=localStorage.getItem('userToken');

        if(!authToken){
            console.log('auth token not found');
        }
        const iosusers=await Action.get('/iosuser',{
            headers:{
                'x-access-token': authToken,
            }
        });
        console.log(iosusers);
        return iosusers.data;
    } catch (error) {
        console.log(error.message);
    }
}


//get web users

export const webUser=async()=>{
    try {
        const authToken=localStorage.getItem('userToken');

        if(!authToken){
            console.log('auth token not found');
        }
        const webusers=await Action.get('/webuser',{
            headers:{
                'x-access-token': authToken,
            }
        });
        console.log(webusers);
        return webusers.data;
    } catch (error) {
        console.log(error.message);
    }
}


//add user

// userService.js


export const addUser = async (payload) => {
    try {
      const authToken = localStorage.getItem('userToken');
  
      if (!authToken) {
        console.log('auth token not found');
      }
  
      const adduser = await Action.post('/addUser', payload, {
        headers: {
          'x-access-token': authToken,
        },
      });
  
      console.log(adduser);
  
      return adduser?.data;
    } catch (error) {
      console.log("Error in addUser:", error.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Server response data:", error.response.data);
        console.log("Server response status:", error.response.status);
        console.log("Server response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error:", error.message);
      }
  
      throw error; // Rethrow the error to propagate it to the calling function
    }
  };
  

//get users

export const getUsers=async()=>{
try {
    const authToken=localStorage.getItem('userToken');

        if(!authToken){
            console.log('auth token not found');
        }   
        const getuser=await Action.get('/getUser',{
            headers:{
                'x-access-token': authToken,
            }
        });
        return getuser.data;
} catch (error) {
    console.log(error.message);
}
}

//update user

  
export const updateUser = async (id, payload) => {
    try {
      const authToken = localStorage.getItem('userToken');
  
      if (!authToken) {
        console.log('auth token not found');
      }
  
      const updateuser = await Action.put(`/updateUser/${id}`, payload, {
        headers: {
          'x-access-token': authToken,
        },
      });
  
      console.log(updateuser);
      return updateuser?.data;
    } catch (error) {
      console.error("Error in updateUser:", error.message);
  
      if (error.response) {
        console.error("Server response data:", error.response.data);
  
        // You might want to handle specific status codes here
        if (error.response.status === 400) {
          // Handle 400 Bad Request
        } else if (error.response.status === 401) {
          // Handle 401 Unauthorized
        } else if (error.response.status === 500) {
          // Handle 500 Internal Server Error
        }
      }
  
      throw error; // Rethrow the error to propagate it to the calling function
    }
  };
  

//delete user

export const deleteUser=async(id)=>{
        try {
            const authToken=localStorage.getItem('userToken');
        
                if(!authToken){
                    console.log('auth token not found');
                }   
                const deleteuser=await Action.delete(`/deleteUser/${id}`,{
                    headers:{
                        'x-access-token': authToken,
                    }
                });
                return deleteuser.data;
        } catch (error) {
            console.log(error.message);
        }
        }