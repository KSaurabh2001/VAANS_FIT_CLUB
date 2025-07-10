import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { assignTrainer, unassignTrainer } from "../../Redux/GymHandler/Action";

const AssignTrainerToUser = () => {
  const navigate = useNavigate();
 const dispatch=useDispatch();
 const token =localStorage.getItem("token");
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    userUsername: "",
    trainerId: "",
    trainerName: "",
    trainerUsername: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAssign = () => {
    console.log("Assigning trainer to user:", formData);
    // Place your assign API call here
    dispatch(assignTrainer(formData.userId,formData.trainerId,token));
    navigate(-1);
  };

  const handleUnassign = () => {
    console.log("Unassigning trainer from user:", formData);
   dispatch(unassignTrainer(formData.userId,formData.trainerId,token));
   navigate(-1);
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/h.jpg')` }}
      />
      <div className="absolute inset-0 bg-black/70 z-0" />
      <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-md text-white p-10 rounded-3xl shadow-xl border border-white/20">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 text-white hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-8 text-center">Assign / Unassign Trainer to User</h2>

        <form className="space-y-6">
          {[
            { label: "User ID", name: "userId" },
            { label: "User Name", name: "userName" },
            { label: "User Username", name: "userUsername" },
            { label: "Trainer ID", name: "trainerId" },
            { label: "Trainer Name", name: "trainerName" },
            { label: "Trainer Username", name: "trainerUsername" },
          ].map(({ label, name }) => (
            <div key={name}>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={label}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          ))}

          <div className="flex gap-4 justify-between mt-6">
            <button
              type="button"
              onClick={handleAssign}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Assign
            </button>
            <button
              type="button"
              onClick={handleUnassign}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Unassign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTrainerToUser;
