import React, { useState, useEffect } from "react";
import Header from "../Component/Header";

import { Outlet } from "react-router-dom";
import GymOwnerSidebar from "../Component/Sidebar/GymOwner";
import GymHandlerSidebar from "../Component/Sidebar/GymHandler";
import GymTrainerSidebar from "../Component/Sidebar/GymTrainer";
import GymUserSidebar from "../Component/Sidebar/GymUser";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { getUserByToken } from "../Redux/Auth/Action";

const Layout = () => {
  const token = useSelector((store) => store.auth.token); 
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user); // assuming redux
  

  const renderSidebar = () => {


    switch (currentUser?.role) {
      case "GYM_OWNER":
        return <GymOwnerSidebar closeSidebar={() => setSidebarOpen(false)} />;
      case "GYM_HANDLER":
        return <GymHandlerSidebar closeSidebar={() => setSidebarOpen(false)} />;
      case "GYM_TRAINER":
        return <GymTrainerSidebar closeSidebar={() => setSidebarOpen(false)} />;
      case "GYM_USER":
        return <GymUserSidebar closeSidebar={() => setSidebarOpen(false)} />;
      default:
        return null;
    }
  };



  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className=" flex flex-col h-screen bg-black text-white overflow-hidden">

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Content below Header */}
      <div className="flex flex-1 pt-16 relative h-full ">
        <main className="flex-1 overflow-auto scrollbar-hide">
          <Outlet />
        </main>

        {/* Sidebar overlay from right */}
        {isSidebarOpen && (
          <div
            className="fixed top-0 right-0 h-full w-64 z-50 bg-white/10 backdrop-blur-md border-l border-white/20 shadow-lg overflow-y-auto"
          >
            {renderSidebar()}
            {console.log("Current User:", currentUser)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
