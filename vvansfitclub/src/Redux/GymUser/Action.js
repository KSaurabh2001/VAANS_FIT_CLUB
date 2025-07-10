import { EDIT_USER_PROFILE } from "../Auth/ActionType";
import { ENROLL, MEMBERSHIP, UNENROLL, USER_BY_ID, USER_SESSION, USER_TRAINER } from "./ActionType";

const BASE="http://localhost:9090/api"

export const editUserProfile = (data,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/user/editUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json(); 
    dispatch({ type: EDIT_USER_PROFILE, payload: result });
    console.log(result);
     return result;
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const userById = (id,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/user/userById/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
     
    });

    const result = await res.json(); 
    dispatch({ type: USER_BY_ID, payload: result });
    console.log(result);
     return result;
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const enroll = (userId,sessionId,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/user/enroll?userId=${userId}&sessionId=${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
     
    });

    const result = await res.json(); 
    dispatch({ type: ENROLL, payload: result });
    console.log(result);
     return result;
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const unenroll = (userId,sessionId,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/user/unenroll?userId=${userId}&sessionId=${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
     
    });

    const result = await res.json(); 
    dispatch({ type: UNENROLL, payload: result });
    console.log(result);
     return result;
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const userSession = (id,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/user/allUserSession/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
     
    });

    const result = await res.json(); 
    dispatch({ type: USER_SESSION, payload: result });
    console.log(result);
     return result;
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const userTrainer = (id,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/user/allUserTrainer/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
     
    });

    const result = await res.json(); 
    dispatch({ type: USER_TRAINER, payload: result });
    console.log(result);
     return result;
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const userPlan = (id,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/user/userPlan/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
     
    });

    const result = await res.json(); 
    dispatch({ type: MEMBERSHIP, payload: result });
    console.log(result);
     return result;
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};