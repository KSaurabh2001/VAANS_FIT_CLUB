import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { assignClass, unassignClass } from "../../Redux/GymHandler/Action";

const AssignTrainerToClassSession = () => {
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const dispatch=useDispatch();

  const [formData, setFormData] = useState({
    trainerId: "",
    trainerName: "",
    trainerUsername: "",
    classSessionId: "",
    classSessionName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAssign = () => {
    console.log("Assign trainer to class session:", formData);
   dispatch(assignClass(formData.classSessionId, formData.trainerId,token));
   navigate(-1);
  };

  const handleUnassign = () => {
    console.log("Unassign trainer from class session:", formData);
    // Place your unassign API call here
    dispatch(unassignClass(formData.classSessionId, formData.trainerId,token));
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

        <h2 className="text-3xl font-bold mb-8 text-center">Assign / Unassign Trainer to Class Session</h2>

        <form className="space-y-6">
          {[
            { label: "Trainer ID", name: "trainerId" },
            { label: "Trainer Name", name: "trainerName" },
            { label: "Trainer Username", name: "trainerUsername" },
            { label: "Class Session ID", name: "classSessionId" },
            { label: "Class Session Name", name: "classSessionName" },
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

export default AssignTrainerToClassSession;
