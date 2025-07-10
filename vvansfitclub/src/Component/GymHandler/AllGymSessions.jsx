import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { allClass, deleteClass } from "../../Redux/GymHandler/Action";



const AllGymSessions = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const classes = useSelector((store) => store.handler.allClasses);

  useEffect(() => {

    dispatch(allClass(token));
  },[token,dispatch])

  const filteredSessions = classes?.filter((session) =>
    `${session.name}`.toLowerCase().includes(search.toLowerCase())
  );

  

  const handleClick = (session) => {
    navigate(`/home/class-session/${session.id}`);
  };

  const handleDelete=(sessionid) => {
      dispatch(deleteClass(sessionid,token));
    }

  return (
    <div className="relative min-h-screen bg-cover bg-center px-4 py-10" style={{ backgroundImage: `url('/h.jpg')` }}>
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 rounded-2xl shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">All Class Sessions</h2>

        {/* Search */}
        <div className="flex items-center gap-2 mb-8 max-w-md mx-auto">
          <Search className="w-5 h-5 text-white" />
          <input
            type="text"
            placeholder="Search by session name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-md border border-white/20 hover:shadow-xl transition-transform hover:-translate-y-1"
            >
              <img
                src={session.image || "/placeholder.jpg"}
                alt={session.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold text-white">{session.name}</h3>
                <p className="text-sm text-gray-300 italic">{session.timing}</p>
                <p className="text-sm text-gray-400">{session.description}</p>
                <p className="text-xs text-gray-500">Gym ID: {session.gymID}</p>
                <p className="text-xs text-gray-500">Session ID: {session.id}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => navigate(`/home/class-session/${session.id}`)}
                    className="text-sm px-4 py-1 bg-green-600 hover:bg-green-700 rounded-lg font-medium"
                  >
                    View/Edit
                  </button>
                  <button
                    onClick={() => handleDelete(session.id)}
                    className="text-sm px-4 py-1 bg-red-600 hover:bg-red-700 rounded-lg font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllGymSessions;
