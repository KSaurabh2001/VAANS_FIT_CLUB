import { Dumbbell } from "lucide-react";
import { Menu } from 'lucide-react';
import { useState,useEffect } from "react";
const Header = ({ toggleSidebar }) => {

   const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = dateTime.toLocaleDateString();

  return (
     <header className="bg-gradient-to-r from-red-900 via-red-800 to-gray-900 shadow-lg">
      <div>
        <div className="flex justify-between items-center px-4 py-4">
          {/* Left: Logo */}
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">VVANS Fit Club</span>
          </div>

          {/* Center: Time & Date */}
          <div className="text-white text-center hidden md:block">
            <div className="text-sm font-semibold">{formattedDate}</div>
            <div className="text-sm">{formattedTime}</div>
          </div>

          {/* Right: Menu */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-white/20 transition-colors duration-200 focus:outline-none"
          >
            <Menu className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
