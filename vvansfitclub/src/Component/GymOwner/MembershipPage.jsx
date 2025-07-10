import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, X } from "lucide-react";
import { useEffect } from "react";
import { getMembershipById } from "../../Redux/GymOwner/Action";

const MembershipPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const token=localStorage.getItem("token");

  const plan = useSelector((store) =>
    store.owner.MembershipById);

  const gradient = {
    "Basic": "bg-gradient-to-br from-gray-800 to-gray-900",
    "Premium+": "bg-gradient-to-br from-red-800 to-orange-700",
    "Elite": "bg-gradient-to-br from-orange-800 to-yellow-600",
    "Pro": "bg-gradient-to-br from-red-900 to-yellow-600",
  };

  useEffect(() => {

    dispatch(getMembershipById(id,token));
  },[dispatch,token,id])

  // Dummy enrolled users
  const enrolledUsers = [
    {
      id: 1,
      name: "Saurabh Kumar",
      username: "saurabh_k",
      gymId: 101,
      location: "Pune",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Aisha Mehra",
      username: "aisha_m",
      gymId: 102,
      location: "Delhi",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-10 relative"
      style={{ backgroundImage: `url('/e.jpg')` }}
    >
     

      <div className="bg-black/70 backdrop-blur-md p-6 rounded-2xl text-white max-w-6xl mx-auto space-y-12">
       {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 z-50 text-white bg-white/20 hover:bg-red-600 hover:text-white p-2 rounded-full transition"
      >
        <X className="w-5 h-5" />
      </button>
        {/* Membership Plan Card */}
        <div
          className={`rounded-xl p-8 shadow-lg border text-white w-full ${
            plan?.name ? gradient[plan.name] : "bg-gradient-to-br from-gray-800 to-gray-900"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            💳 {plan?.name || "Unknown"} Membership Plan
          </h2>

          <div className="text-center mb-6 space-y-2">
            <div className="text-5xl font-extrabold">₹{plan?.price}</div>
            <div className="text-md text-gray-200">Duration: {plan?.duration}</div>
          </div>

          <ul className="space-y-3 text-sm max-w-md mx-auto">
            {plan?.features?.map((feature, i) => (
              <li key={i} className="flex items-center text-gray-100">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Enrolled Users Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4 border-b border-white/30 pb-2">
            👥 Users Enrolled
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {plan?.gymUser?.map((user) => (
              <div
                key={user.id}
                className="bg-white/10 border border-white/20 rounded-xl p-4 flex items-center gap-4 shadow-md hover:bg-white/20 transition"
              >
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-white">{user.name}</h4>
                  <p className="text-sm text-gray-300">Username: {user.username}</p>
                  <p className="text-sm text-gray-300">Gym ID: {user.gymId}</p>
                  <p className="text-sm text-gray-300">Location: {user.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
