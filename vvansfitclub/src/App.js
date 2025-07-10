import logo from './logo.svg';
import './App.css';
import Routers from './Pages/Router';
import {useEffect} from "react";
import { useDispatch } from 'react-redux';
import { getUserByToken } from './Redux/Auth/Action';

function App() {
  const dispatch=useDispatch();
  const token = localStorage.getItem("token");
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserByToken(token));
    }
  }, [dispatch,token]);

  return (
    <div className="App">
     <Routers />
    </div>
  );
}

export default App;
