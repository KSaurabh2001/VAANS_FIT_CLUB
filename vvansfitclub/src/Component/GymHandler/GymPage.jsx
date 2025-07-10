import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, Search,Eye, Trash2 } from "lucide-react";
import UserCard from "../GymOwner/UserCard"; // Adjust path if needed
import { useDispatch, useSelector } from "react-redux";
import { getGymById } from "../../Redux/GymOwner/Action";
import { deleteClass } from "../../Redux/GymHandler/Action";

const GymPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const gym = useSelector((store) => store.owner.GymById);
  const { AllGymUsers, AllGymTrainer } = useSelector((store) => store.owner);


  useEffect(() => {
    dispatch(getGymById(id, token))
  }, [id, token, dispatch, AllGymUsers, AllGymTrainer]);


  const gymInfo = {
    id: gym?.id,
    name: gym?.name,
    location: gym?.location,
    phone: gym?.phone,
  };

  const allUsers = gym?.gymUSer;
  const allTrainers = gym?.trainer;
  const classSessions = gym?.classSession;
  // const allUsers = [
  //   {
  //     id: 1,
  //     name: "Saurabh Kumar",
  //     gender: "Male",
  //     username: "saurabh.k",
  //     age: "24",
  //     image: "https://i.pravatar.cc/150?img=5",
  //     location: "Pune",
  //     role: "GYM_USER",
  //   },
  //   {
  //     id: 2,
  //     name: "Neha Mehta",
  //     gender: "Female",
  //     username: "neha.fit",
  //     age: "22",
  //     image: "https://i.pravatar.cc/150?img=47",
  //     location: "Delhi",
  //     role: "GYM_USER",
  //   },
  // ];

  // const allTrainers = [
  //   {
  //     id: 3,
  //     name: "Amit Verma",
  //     gender: "Male",
  //     username: "amit.v",
  //     age: "30",
  //     image: "https://i.pravatar.cc/150?img=18",
  //     location: "Mumbai",
  //     role: "TRAINER",
  //   },
  //   {
  //     id: 4,
  //     name: "Priya Sharma",
  //     gender: "Female",
  //     username: "priya.s",
  //     age: "27",
  //     image: "https://i.pravatar.cc/150?img=21",
  //     location: "Delhi",
  //     role: "TRAINER",
  //   },
  // ];

  // const classSessions = [
  //   {
  //     id: 1,
  //     name: "HIIT Burn",
  //     timing: "07:00 AM - 08:00 AM",
  //     description: "High intensity interval training for fat loss.",
  //     image: "https://source.unsplash.com/500x300/?hiit,gym",
  //     id: id,
  //   },
  //   {
  //     id: 2,
  //     name: "Strength Training",
  //     timing: "06:00 PM - 07:00 PM",
  //     description: "Focus on muscle building and strength.",
  //     image: "https://source.unsplash.com/500x300/?weights,gym",
  //     id: id,
  //   },
  // ];

  const [search, setSearch] = useState("");

  const filteredUsers = allUsers?.filter((u) =>
    `${u.name} ${u.username}`.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTrainers = allTrainers?.filter((t) =>
    `${t.name} ${t.username}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (sessionid) => {
    dispatch(deleteClass(sessionid, token));
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/h.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/10 z-0" />

      <div className="relative z-10  mx-auto backdrop-blur-md border border-white/20 text-white p-6 rounded-2xl shadow-lg space-y-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Gym Info */}
        <div className="mb-8 p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-white/5 via-black/10 to-white/5 shadow-md backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-4 text-center text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 bg-clip-text">
            {gymInfo.name}
          </h1>

          <div className="text-white text-sm sm:text-base space-y-2 text-center">
            <p className="text-gray-300">
              🆔 <span className="font-semibold text-white">{gymInfo.id}</span>
            </p>
            <p className="text-gray-300">
              📍 <span className="font-semibold text-white">{gymInfo.location}</span>
            </p>
            <p className="text-gray-300">
              ☎️ <span className="font-semibold text-white">{gymInfo.phone}</span>
            </p>
          </div>
        </div>


        {/* Class Sessions Section */}
        <div className="space-y-9">
          <div className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-600  via-gray-700 to-black shadow-md">
            <h2 className="text-2xl font-bold text-white">🔥 Class Sessions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {classSessions?.map((session) => (
              <div
                key={session?.id}
                className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-md border border-white/20 hover:shadow-xl transition-transform hover:-translate-y-1"
              >
                <img
                  src={session.image}
                  alt={session.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    {session.name}
                  </h3>
                  <p className="text-sm text-gray-300 italic">
                    {session.timing}
                  </p>
                  <p className="text-sm text-gray-400">{session.description}</p>
                  <p className="text-xs text-gray-500">
                    Session ID: {session?.id}
                  </p>
                  <div className="flex justify-end  gap-2 mt-4">
                   
                    <button
                      onClick={() => navigate(`/home/class-session/${session.id}`)}
                      className="p-1 rounded-full bg-gray-500 hover:bg-gray-600 transition"
                    >
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                    <button
                     onClick={() => handleDelete(session.id)}
                      className="text-red-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 max-w-9xl w-full">
          <Search className="w-4 h-4 text-white" />
          <input
            type="text"
            placeholder="Search user by name or username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        {/* Users Section */}
        <div className="space-y-9">
          <div className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-600   via-gray-700 to-black shadow-md">
            <div className="flex items-center justify-center">
              <h2 className="text-2xl font-bold text-white">👤 All Users</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" >
            {filteredUsers?.map((user) => (
              <UserCard key={user?.id} user={user} />
            ))}
          </div>
        </div>

        {/* Trainers Section */}
        <div className="space-y-9">
          <div className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-600  via-gray-700 to-black shadow-md">
            <h2 className="text-2xl font-bold text-white">🏋️ All Trainers</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredTrainers?.map((trainer) => (
              <UserCard key={trainer?.id} user={trainer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymPage;
