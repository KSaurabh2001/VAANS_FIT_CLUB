import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClassById, editClass } from "../../Redux/GymHandler/Action";
import { X } from "lucide-react";
import uploadToCloudinary from "../../Config/UploadToCloud";

const EditClassSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const session = useSelector((state) => state.handler.classById);

  const [formData, setFormData] = useState({
    name: "",
    timing: "",
    description: "",
    gymID: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch session by ID
  useEffect(() => {
    dispatch(getClassById(id, token));
  }, [id, token, dispatch]);

  // Set form values when session is loaded
  useEffect(() => {
    if (session) {
      setFormData({
        name: session.name || "",
        timing: session.timing || "",
        description: session.description || "",
        gymID: session.gymID || "",
        image: null,
      });
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      let imageUrl = session.image;

      if (formData.image) {
        imageUrl = await uploadToCloudinary(formData.image);
      }

      const updatedSession = {
        id: session.id,
        name: formData.name,
        timing: formData.timing,
        description: formData.description,
        gymID: formData.gymID,
        image: imageUrl,
      };

      await dispatch(editClass(updatedSession, token));
      navigate(-1);
    } catch (err) {
      console.error("Error updating session:", err);
      setError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
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

        <h2 className="text-3xl font-bold mb-8 text-center">Edit Class Session</h2>

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
            <label className="mb-1 font-semibold">Change Session Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30 file:bg-red-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer"
            />
          </div>

          {error && (
            <div className="col-span-2 text-red-400 text-sm mt-2">{error}</div>
          )}

          <div className="col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
            >
              {isSubmitting ? "Updating..." : "Update Session"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClassSession;
