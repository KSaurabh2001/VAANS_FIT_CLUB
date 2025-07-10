import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Play,
  Star,
  Clock,
  Users,
  Dumbbell,
  Heart,
  Zap,
  ArrowRight,
  CheckCircle,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import About from "../Component/Dashboard/About";
import Class from "../Component/Dashboard/Class";
import Membership from "../Component/Dashboard/Membership";
import Footer from "../Component/Dashboard/Footer";
import Hero from "../Component/Dashboard/Herosection";

function Dashboard() {
 

  

  

  return (
    <div className="min-h-screen bg-black text-white ">
     
     <Hero />
      <About />
      <Class />
      <Membership />
    <Footer/>
     
    </div>
  );
}

export default Dashboard;
