import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction, getUserByToken, loginAction } from "../Redux/Auth/Action";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const login = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.auth.user);
  const token = useSelector((store) => store.auth.token);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


 useEffect(() => {
  if (token) {
    localStorage.setItem("token", token);
    dispatch(getUserByToken(token));
  }
}, [token,dispatch]);


  // Navigate when user is available
  useEffect(() => {
    if (user?.username) {
      console.log("User ready, navigating to: /home/" + user.username);
      navigate("/home");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login Data:", formData);

    // 1. Login first
    dispatch(loginAction(formData)); 



  };


  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className=" max-w-md bg-black/40 backdrop-blur border border-white/20 rounded-xl p-8 shadow-2xl">
        <div className=" bg-gradient-to-b from-red-900 via-red-800 to-gray-900 backdrop-blur-md p-8 rounded-xl w-full max-w-md border border-white/10 shadow-2xl">
          <h2 className="text-3xl font-extrabold text-white text-center mb-6">
            🏋️‍♂️ Login to <span className="text-orange-400">VVANS Fit Club</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              required
            />

            {/* <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            >
              <option value="GYM_OWNER">GYM_OWNER</option>
              <option value="GYM_HANDLER">GYM_HANDLER</option>
              <option value="GYM_TRAINER">GYM_TRAINER</option>
              <option value="GYM_USER">GYM_USER</option>
            </select> */}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:shadow-lg hover:shadow-red-500/25 text-white py-3 rounded-md font-semibold transition-transform hover:scale-105"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
