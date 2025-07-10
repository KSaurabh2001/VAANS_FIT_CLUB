import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { X, Search,Pencil, Trash2 } from "lucide-react";
import UserCard from "../GymOwner/UserCard"; // adjust path
import { useDispatch, useSelector } from "react-redux";
import { deleteClass, getClassById } from "../../Redux/GymHandler/Action";


const ClassSessionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const session = useSelector((store) => store.handler.classById);

  useEffect(() => {

    dispatch(getClassById(id, token));
  }, [id, token, dispatch])

  console.log("session", session);

  const filteredUsers = session?.gymUSer?.filter((user) =>
    `${user.name} ${user.username}`.toLowerCase().includes(search.toLowerCase())
  );



  const handleDelete = () => {
    dispatch(deleteClass(session.id, token))
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center px-4 py-10" style={{ backgroundImage: `url('/h.jpg')` }}>
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 rounded-2xl shadow-lg">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Session Info */}
        <div className="mb-8">
          <img
            src={session?.image}
            alt={session?.name}
            className="w-full h-64 object-cover rounded-xl mb-4"
          />
          <h2 className="text-4xl font-bold mb-2">{session?.name}</h2>
          <p className="text-sm text-gray-300 italic mb-1">{session?.timing}</p>
          <p className="text-sm text-gray-300 mb-2">{session?.description}</p>
          <p className="text-xs text-gray-400 mb-4">Gym ID: {session?.gymID}</p>
          <p className="text-xs text-gray-400 mb-4">Session ID: {session?.id}</p>

          <div className="flex gap-4">
           
            <button
              onClick={() => navigate(`/home/editclasssession/${session?.id}`)}
              className="p-1 rounded-full bg-gray-500 hover:bg-gray-600 transition"
            >
              <Pencil className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-400 hover:text-red-600"
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User List Header */}
        <div className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-600   via-gray-700 to-black shadow-md">
            <div className="flex items-center justify-center">
              <h2 className="text-2xl font-bold text-white">👤 All Users</h2>
            </div>
          </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-6 mt-8 max-w-md">
          <Search className="w-5 h-5 text-white" />
          <input
            type="text"
            placeholder="Search user by name or username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* User Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers?.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() =>
                navigate(`/userProfileForOthers/${user.id}`)
              }

              onDelete={(id) => console.log("Delete user with id:", id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassSessionPage;
