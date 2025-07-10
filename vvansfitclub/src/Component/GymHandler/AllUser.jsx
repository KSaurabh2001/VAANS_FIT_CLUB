import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Search } from "lucide-react";
import UserCard from "../GymOwner/UserCard"; // adjust the path
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../../Redux/GymOwner/Action";


const AllGymUsers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const dispatch =useDispatch();
  const token=localStorage.getItem("token");
  const user=useSelector((store) => store.owner.AllGymUser);

  useEffect(() => {
 dispatch(allUser(token));
  },[token,dispatch])

  const filteredUsers = user?.filter((user) =>
    `${user.name} ${user.username}`.toLowerCase().includes(search.toLowerCase())
  );


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

        <h2 className="text-3xl font-bold mb-6 text-center">All Users</h2>

        <div className="flex items-center gap-2 mb-8 max-w-md mx-auto">
          <Search className="w-5 h-5 text-white" />
          <input
            type="text"
            placeholder="Search by name or username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers?.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllGymUsers;
