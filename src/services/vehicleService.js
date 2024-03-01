import { Action } from "../config/action";



//add vehicle

export const addVehicle=async(payload)=>{
    try {
        const authToken=localStorage.getItem('userToken');

        if(!authToken){
            console.log('auth token not found');
        }   
        const addvehicle=await Action.post('/createVehicle',payload,{
            headers:{
                'x-access-token': authToken,
            }
        });
        console.log(addvehicle);
        return addvehicle.data;

        } catch (error) {
        console.log(error.message);
    }
}

//get vehicles

export const getVehicles=async()=>{
    try {
        const authToken=localStorage.getItem('userToken');
    
            if(!authToken){
                console.log('auth token not found');
            }   
            const getvehicles=await Action.get('/getVehicle',{
                headers:{
                    'x-access-token': authToken,
                }
            });
            console.log(getvehicles);
            return getvehicles.data;
    } catch (error) {
        console.log(error.message);
    }
    }

    //update vehicle

    export const updateVehicle = async (id, payload) => {
        try {
          const authToken = localStorage.getItem('userToken');
      
          if (!authToken) {
            console.log('auth token not found');
          }
      
          const updateResponse = await Action.put(`/updateVehicle/${id}`, payload, {
            headers: {
              'x-access-token': authToken,
            },
          });
      
          console.log('Update Response:', updateResponse.data);
          return updateResponse.data;
        } catch (error) {
          console.error("Error in updateVehicle:", error.message);
      
          if (error.response) {
            console.error("Server response data:", error.response.data);
          }
      
          throw error; // Rethrow the error to propagate it to the calling function
        }
      };
      

        //delete vehicle

        export const deleteVehicle=async(id)=>{
            try {
                const authToken=localStorage.getItem('userToken');
            
                    if(!authToken){
                        console.log('auth token not found');
                    }   
                    const deletevehicle=await Action.delete(`/deleteVehicle/${id}`,{
                        headers:{
                            'x-access-token': authToken,
                        }
                    });
                    console.log(deletevehicle);
                    return deletevehicle.data;
            } catch (error) {
                console.log(error.message);
            }
            }