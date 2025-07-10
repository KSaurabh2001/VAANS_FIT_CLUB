import { Trash2, Eye } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTrainer, deleteUser } from "../../Redux/GymOwner/Action";
import { trainerById } from "../../Redux/GymTrainer/Action";
import { userById } from "../../Redux/GymUser/Action";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const handleViewProfile = () => {
    if (user.role === "GYM_USER") {

      console.log("user", user)
      dispatch(userById(user.id, token));
      navigate(`/home/userProfileForOthers/${user.id}`);
    } else if (user.role === "GYM_TRAINER") {

      dispatch(trainerById(user.id, token));
      navigate(`/home/trainerProfile/${user.id}`);
    }
  };

  const onDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${user.name}?`);
    if (!confirmDelete) return;

    if (user.role === "GYM_USER") {
      console.log("delete user");
      dispatch(deleteUser(user.id, token));
    } else if (user.role === "GYM_TRAINER") {
      console.log("delete trainer");
      dispatch(deleteTrainer(user.id, token));
    }
  };

  return (
    <div className="relative bg-white/10 hover:bg-white/20 transition border border-white/20 rounded-xl p-5 shadow text-white">
      {/* Delete Icon */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={handleViewProfile}
          className="p-1 rounded-full bg-gray-500 hover:bg-gray-600 transition"
        >
          <Eye className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={onDelete}
          className="text-red-400 hover:text-red-600"
          title="Delete"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>


      {/* Profile Image */}
      <div className="w-full flex justify-center mb-3">
        <img
          src={user.image}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border border-white/30 shadow"
        />
      </div>

      {/* Name */}
      <h3 className="text-xl font-semibold text-center mb-4 truncate">
        {user.name}
      </h3>

      {/* User Details */}
      <div className="text-sm text-gray-300 space-y-1 text-center">
        <p>🆔 <span className="text-white">{user.id}</span></p>
        <p>👤 Username: <span className="text-white">{user.username}</span></p>
        <p>🧑 Gender: <span className="text-white">{user.gender}</span></p>
        <p>📍 Location: <span className="text-white">{user.location}</span></p>
        <p>🎯 Occupation: <span className="text-white">{user.occupation}</span></p>
      </div>


    </div>
  );
};

export default UserCard;

