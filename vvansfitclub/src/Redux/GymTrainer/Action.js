import { EDIT_TRAINER_PROFILE } from "../Auth/ActionType";
import { ADD_WORKOUT,ALL_DIET,ALL_WORKOUT, ASSIGN_DIET, ASSIGN_WORKOUT, DELETE_DIET, DELETE_WORKOUT, EDIT_WORKOUT, GET_WORKOUT_BY_ID, TRAINER_BY_ID, UNASSIGN_DIET, UNASSIGN_WORKOUT } from "./ActionType";



const BASE="http://localhost:9090/api"

export const addWorkout = (data,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/trainer/addworkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json(); 
    dispatch({ type: ADD_WORKOUT, payload: result });
    console.log(result);
     return result;
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const allWorkout = (jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/trainer/allworkouts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
     
    });

    const result = await res.json(); 
    dispatch({ type: ALL_WORKOUT, payload: result });
    console.log("result",result);
     
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const deleteWorkout = (id,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/trainer/deleteworkout/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
     
    });

    const result = await res.json(); 
    dispatch({ type: DELETE_WORKOUT, payload: result });
    console.log("result",result);
     
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const editWorkout = (id,data,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/trainer/updateworkout/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json(); 
    dispatch({ type: EDIT_WORKOUT, payload: result });
    console.log("result",result);
     
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const getWorkoutById = (id,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/trainer/getWorkoutById/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
    
    });

    const result = await res.json(); 
    dispatch({ type: GET_WORKOUT_BY_ID, payload: result });
    console.log("result",result);
     
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};


export const addDiet = (data,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/trainer/adddiet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json(); 
    dispatch({ type: ADD_WORKOUT, payload: result });
    console.log(result);
     return result;
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const allDiet = (jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/trainer/alldiets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
    
    });

    const result = await res.json(); 
    dispatch({ type: ALL_DIET, payload: result });
    console.log(result);
     return result;
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const deleteDiet = (id,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/trainer/deletediet/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
    
    });

    const result = await res.json(); 
    dispatch({ type: DELETE_DIET, payload: result });
    console.log(result);
     return result;
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};


export const assignDiet = (userId,dietId,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/trainer/assign/diet?userId=${userId}&dietId=${dietId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      
    });

    // const result = await res.json(); 
    dispatch({ type: ASSIGN_DIET});
    console.log("done");
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const unassignDiet = (userId,dietId,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/trainer/unassign/diet?userId=${userId}&dietId=${dietId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      
    });

  
    dispatch({ type: UNASSIGN_DIET });
    console.log("done");
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};
export const assignWorkout = (userId,workoutId,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/trainer/assign/workout?userId=${userId}&workoutId=${workoutId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      
    });

    // const result = await res.json(); 
    dispatch({ type: ASSIGN_WORKOUT});
    console.log("done");
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const unassignWorkout = (userId,workoutId,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/trainer/unassign/workout?userId=${userId}&workoutId=${workoutId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      
    });

  
    dispatch({ type: UNASSIGN_WORKOUT });
    console.log("done");
    
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const editTrainerProfile = (data,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/trainer/editTrainer`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json(); 
    dispatch({ type: EDIT_TRAINER_PROFILE, payload: result });
    console.log(result);
     return result;
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const trainerById = (id,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE}/trainer/trainerById/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + jwt,
      },
     
    });

    const result = await res.json(); 
    dispatch({ type: TRAINER_BY_ID, payload: result });
    console.log(result);
     return result;
      
  } catch (error) {
    console.log("Login error: ", error);
  }
};
