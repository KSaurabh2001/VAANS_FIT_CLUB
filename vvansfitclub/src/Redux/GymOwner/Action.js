import { EDIT_OWNER_PROFILE } from "../Auth/ActionType";
import { ADD_GYM, ADD_HANDLER, ADD_MEMBERSHIP, ADD_TRAINER, 
  ADD_USER, ALL_GYM, ALL_HANDLER, ALL_MEMBERSHIP, ALL_TRAINER, 
  ALL_USER, ASSIGN_GYM_HANDLER, DELETE_GYM, DELETE_HANDLER, 
  DELETE_MEMBERSHIP, DELETE_TRAINER, DELETE_USER, EDIT_GYM, GET_GYM_BY_ID, GET_MEMBERSHIP_BY_ID, UNASSIGN_GYM_HANDLER } from "./ActionTypes";

const BASE="http://localhost:9090/api"

export const addGym = (data,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/owner/addgyms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data), // data = { email, password }
    });

    const result = await res.json(); 
    dispatch({ type: ADD_GYM, payload: result });
    console.log(result);
     return result;
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const allGyms = (jwt) => async (dispatch) => {
  try {
    
    const res = await fetch(`${BASE}/owner/allgyms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const resData = await res.json();
    console.log( resData);
    dispatch({ type: ALL_GYM, payload: resData }); 
  
  } catch (error) {
    console.log("catch error - ", error);
  }
};

export const getGymById = (id,jwt) => async (dispatch) => {
  try {
    
    const res = await fetch(`${BASE}/owner/gym/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const resData = await res.json();
    console.log( "gym from backend",resData);
    dispatch({ type: GET_GYM_BY_ID, payload: resData }); 
  
  } catch (error) {
    console.log("catch error - ", error);
  }
};

export const deleteGym= (id,jwt) => async (dispatch) => {
  try {
     
    const res = await fetch(`${BASE}/owner/deletegyms/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const resData = await res.json();
    console.log( resData);
    dispatch({ type: DELETE_GYM, payload: resData }); 
  
  } catch (error) {
    console.log("catch error - ", error);
  }
};

export const editGym = (data,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/owner/editgyms`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data), // data = { email, password }
    });

    const result = await res.json(); 
    dispatch({ type: EDIT_GYM, payload: result });
    console.log(result);
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const addMembership = (data,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/owner/addmembership`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data), 
    });

    const result = await res.json(); 
    console.log(result);
    dispatch({ type: ADD_MEMBERSHIP, payload: result });
    
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const deleteMembership = (id,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/owner/deletemembership/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
     
    });

    const result = await res.json(); 
    dispatch({ type: DELETE_MEMBERSHIP, payload: result });
    console.log(result);
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const allMembership = (jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/owner/allmemberships`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
     
    });

    const result = await res.json(); 
    dispatch({ type: ALL_MEMBERSHIP, payload: result });
  
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const getMembershipById = (id,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/owner/getmembership/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
     
    });

    const result = await res.json(); 
    dispatch({ type: GET_MEMBERSHIP_BY_ID, payload: result });
    console.log("memebership",result);
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const addHandler = (data,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/owner/addhandler`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data), 
    });

    const result = await res.json(); 
    dispatch({ type: ADD_HANDLER, payload: result });
    console.log(result);
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const allHandler = (jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/owner/allhandlers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
    
    });

    const result = await res.json(); 
    dispatch({ type: ALL_HANDLER, payload: result });
    console.log(result);
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const deleteHandler = (id,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/owner/deletehandler/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
    
    });

    const result = await res.json(); 
    dispatch({ type: DELETE_HANDLER, payload: result });
    console.log(result);
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const unassignHandler = (id,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/owner/unassign-gym/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
    
    });

    const text = await res.text();
    dispatch({ type: UNASSIGN_GYM_HANDLER });
    console.log(text);
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};
export const assignHandler = (gymId,handlerId,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/owner/assign-gym/${gymId}/${handlerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
    
    });

    const text = await res.text();
    dispatch({ type: ASSIGN_GYM_HANDLER, payload: text});
    console.log(text);
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};


export const addUser = (data,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/handler/adduser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data), 
    });

    const result = await res.json(); 
    dispatch({ type: ADD_USER, payload: result });
    console.log(result);
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const allUser = (jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/handler/allusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
    
    });

    const result = await res.json(); 
    dispatch({ type: ALL_USER, payload: result });
    console.log(result);
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const deleteUser = (id,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/handler/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
    
    });

    const result = await res.json(); 
    console.log("user after deleting",result);
    dispatch({ type: DELETE_USER, payload: result });
    
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const addTrainer = (data,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/handler/addtrainer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data), 
    });

    const result = await res.json(); 
    dispatch({ type: ADD_TRAINER, payload: result });
    console.log(result);
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const allTrainer = (jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/handler/alltrainers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
    
    });

    const result = await res.json(); 
    dispatch({ type: ALL_TRAINER, payload: result });
    console.log(result);
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const deleteTrainer = (id,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/handler/deletetrainer/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
    
    });

    const result = await res.json(); 
      console.log("trainer after deleting",result);
    dispatch({ type: DELETE_TRAINER, payload: result });
   
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const editOwner = (data,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/owner/editOwner`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data), 
    });

    const result = await res.json(); 
    dispatch({ type:EDIT_OWNER_PROFILE , payload: result });
    console.log(result);
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};
