import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGym , allGyms} from "../../Redux/GymOwner/Action";

const AddGymForm = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const token=localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.location || !formData.phone) {
    setError("All fields are required");
    return;
  }

  setIsSubmitting(true);
  setError("");

  try {
    await dispatch(addGym(formData, token)); 
    // ✅ Wait for the dispatch to complete
    navigate(-1);
  } catch (error) {
    setError("Failed to submit gym");
  } finally {
    setIsSubmitting(false);
  }
};
  

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-black">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/h.jpg')` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Form */}
      <div className="relative z-10 w-full max-w-xl bg-white/10 backdrop-blur-md text-white p-8 rounded-2xl shadow-xl border border-white/20">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Add New Gym
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Gym Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter gym name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter location"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="7867XXXXXX"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition"
          >
            {isSubmitting ? "Adding..." : "Add Gym"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGymForm;
