import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addClass } from "../../Redux/GymHandler/Action";
import uploadToCloudinary from "../../Config/UploadToCloud";
const AddClassSessionForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    timing: "",
    description: "",
    image: null,
    gymID: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (!formData[key]) {
        setError("All fields are required.");
        return;
      }
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Step 1: Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(formData.image);

      // Step 2: Create payload and dispatch
      const payload = {
        ...formData,
        image: imageUrl,
      };

      console.log("Final Payload:", payload);
      await dispatch(addClass(payload, token));

      navigate(-1);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url('/h.jpg')` }} />
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-md text-white p-10 rounded-3xl shadow-xl border border-white/20">
        <button onClick={() => navigate(-1)} className="absolute top-6 right-6 text-white hover:text-red-500 transition">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-4xl font-bold mb-10 text-center">Add Class Session</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Class Name", name: "name" },
            { label: "Timing", name: "timing" },
            { label: "Description", name: "description" },
            { label: "Gym ID", name: "gymID", type: "number" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className="flex flex-col">
              <label className="mb-1 font-semibold">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={label}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          ))}

          <div className="flex flex-col col-span-2">
            <label className="mb-1 font-semibold">Upload Class Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30 file:bg-red-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer"
            />
          </div>

          {error && <div className="col-span-2 text-red-400 text-sm mt-2">{error}</div>}

          <div className="col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
            >
              {isSubmitting ? "Submitting..." : "Add Class Session"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClassSessionForm;
