import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Armchair,
  PlusSquare,
  Users,
  ClipboardList,
  BadgePlus,FolderKanban ,
  UserPlus,
  Network,
  UserCog,
  X,
  LogOut,
  UserCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../Redux/Auth/Action";
import React, { useState, useEffect } from "react";



const GymOwnerSidebar = ({ closeSidebar }) => {

  const user=useSelector((store) => store.auth.user);
  const token = useSelector((store) => store.auth.token);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch=useDispatch();
 

  const navItems = [
    {
      name: "Dashboard",
      path: "/home",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Add Gym",
      path: "/home/addGym",
      icon: <PlusSquare className="w-5 h-5" />,
    },
    {
      name: "All Gyms",
      path: "/home/allGyms",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      name: "Add Membership",
      path: "/home/addMembership",
      icon: <BadgePlus className="w-5 h-5" />,
    },
    {
      name: "All Memberships",
      path: "/home/allMembership",
      icon: <FolderKanban className="w-5 h-5" />,
    },
    {
      name: "Add Gym Handler",
      path: "/home/addGymHandler",
      icon: <UserPlus className="w-5 h-5" />,
    },
    {
      name: "All Gym Handlers",
      path: "/home/allGymHandler",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Add User/Trainer",
      path: "/home/addUserOrTrainer",
      icon: <UserCog className="w-5 h-5" />,
    },
    {
      name: "Manage Gym Handler",
      path: "/home/assignGym",
      icon: <Network className="w-5 h-5" />,
    },
    {
      name: "Edit Profile",
      path: "/home/editOwnerProfile",
      icon: <UserCircle className="w-5 h-5" />,
    },
  ];

  const handleLogout = () => {
    console.log("User logged out"); 
      localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    dispatch(logoutAction());
    };

  return (
    <aside className="w-64 h-full bg-white/10 backdrop-blur-md shadow-lg text-white flex flex-col justify-between border-r border-white/20">
  {/* Scrollable Content */}
  <div className="overflow-y-auto scrollbar-hide flex-grow">
        <div className="flex items-center justify-between mb-6 px-4 pt-4">
          <div className="flex items-center space-x-3">
            {user.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="w-12 h-12 rounded-full border border-white/30 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  const fallback = e.target.nextElementSibling;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
            ) : null}
            <div className="hidden w-12 h-12 rounded-full items-center justify-center font-bold text-white text-lg border border-white/30 bg-gradient-to-br from-red-500 to-orange-500">
              {user.username?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-gray-300">@{user.username}</p>
            </div>
          </div>
          <button
            className="text-gray-400 hover:text-white transition"
            onClick={closeSidebar}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-3 px-4 pt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center space-x-3 px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive
                    ? "bg-red-600 text-white shadow"
                    : "hover:bg-red-700/40 hover:text-white text-gray-300"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
         {/* Bottom: Logout */}
      <div className=" p-4 px-4 pb-6">
        <button
          onClick={handleLogout}
          className="w-full bg-gray-700 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-whitehover:text-white hover:bg-red-700/40 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
      </div>

     
    </aside>
  );
};

export default GymOwnerSidebar;
