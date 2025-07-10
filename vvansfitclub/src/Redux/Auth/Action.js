import { LOGIN, LOGOUT } from "./ActionType";
import { toast } from "react-toastify";
import { USER_BY_TOKEN } from "./ActionType";


export const loginAction = (data) => async (dispatch) => {
  try {
    const res = await fetch("http://localhost:9090/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // data = { email, password }
    });

    
    const result = await res.json();  // ✅ Parse JSON
    const token = result.jwtToken;    // ✅ Extract jwtToken field

  

    dispatch({ type: LOGIN, payload: token });
    
     console.log("Login successful!");
    
      
  } catch (error) {
    console.log("Login error: ", error);
   
     
  }
};

export const getUserByToken = (jwt) => async (dispatch) => {
  try {
      console.log("Fetching user with token: ", jwt);
    const res = await fetch("http://localhost:9090/api/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
  
  
const resData = await res.json();
 
console.log("👀 Dispatching USER_BY_TOKEN:", resData);
dispatch({ type: USER_BY_TOKEN, payload: resData }); 
  
  } catch (error) {
    console.log("catch error - ", error);
  }
};


export const logoutAction = () => (dispatch) => {
    localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");

  // 🚀 Clear Redux store
  dispatch({ type: LOGOUT });
  dispatch({ type: LOGOUT });
  toast.success("Logged out");
};

