import { EDIT_HANDLER_PROFILE } from "../Auth/ActionType";
import { ADD_CLASS, ALL_CLASS, ASSIGN_CLASS, ASSIGN_TRAINER, 
  DELETE_CLASS, EDIT_CLASS, GET_CLASS_BY_ID, UNASSIGN_CLASS, UNASSIGN_TRAINER, VERIFY_PAYMENT } from "./ActionType";

const BASE="http://localhost:9090/api"

export const addClass = (data,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/handler/addsession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data), // data = { email, password }
    });

    const result = await res.json(); 
    dispatch({ type: ADD_CLASS, payload: result });
    console.log(result);
     return result;
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const allClass = (jwt) => async (dispatch) => {
  try {
    
    const res = await fetch(`${BASE}/handler/allsessions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const resData = await res.json();
    console.log( resData);
    dispatch({ type: ALL_CLASS, payload: resData }); 
  
  } catch (error) {
    console.log("catch error - ", error);
  }
};

export const getClassById = (id,jwt) => async (dispatch) => {
  try {
    
    const res = await fetch(`${BASE}/handler/sessionById/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const resData = await res.json();
    console.log( "gym from backend",resData);
    dispatch({ type: GET_CLASS_BY_ID, payload: resData }); 
  
  } catch (error) {
    console.log("catch error - ", error);
  }
};

export const deleteClass= (id,jwt) => async (dispatch) => {
  try {
     
    const res = await fetch(`${BASE}/handler/deletesession/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const resData = await res.json();
    console.log( resData);
    dispatch({ type: DELETE_CLASS, payload: resData }); 
  
  } catch (error) {
    console.log("catch error - ", error);
  }
};

export const editClass = (data,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/handler/updatesession`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data), // data = { email, password }
    });

    const result = await res.json(); 
    dispatch({ type: EDIT_CLASS, payload: result });
    console.log(result);
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const assignTrainer = (userId,TrainerId,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/handler/assign/trainer-to-user?userId=${userId}&trainerId=${TrainerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      
    });

    // const result = await res.json(); 
    dispatch({ type: ASSIGN_TRAINER});
    console.log("done");
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const unassignTrainer = (userId,TrainerId,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/handler/unassign/trainer-from-user?userId=${userId}&trainerId=${TrainerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      
    });

  
    dispatch({ type: UNASSIGN_TRAINER });
    console.log("done");
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const assignClass = (sessionId,TrainerId,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/handler/assign/trainer-to-session?sessionId=${sessionId}&trainerId=${TrainerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      
    });

    // const result = await res.json(); 
    dispatch({ type: ASSIGN_CLASS});
    console.log("done");
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const unassignClass = (sessionId,TrainerId,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/handler/unassign/trainer-from-session?sessionId=${sessionId}&trainerId=${TrainerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      
    });

  
    dispatch({ type: UNASSIGN_CLASS });
    console.log("done");
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const verifyPayment = (userId,newStatus,plan,jwt) => async (dispatch) => {
  const encodedPlan = encodeURIComponent(plan);
  try {
    const res = await fetch(`${BASE}/handler/updateUser/payment-status?gymUserId=${userId}&newStatus=${newStatus}&plan=${encodedPlan}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      
    });

  const result = await res.json(); 
    dispatch({ type: VERIFY_PAYMENT, payload: result });
    console.log("result");
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const editHandlerProfile = (data,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/handler/editHandlerProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
       body: JSON.stringify(data),
    });

  const result = await res.json(); 
    dispatch({ type: EDIT_HANDLER_PROFILE , payload: result });
    console.log("updated user", result);
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};



