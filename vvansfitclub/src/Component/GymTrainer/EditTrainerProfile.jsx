import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import uploadToCloudinary from "../../Config/UploadToCloud";
import { editTrainerProfile } from "../../Redux/GymTrainer/Action";
// Adjust if needed

const EditTrainerProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    gender: "",
    occupation: "",
    username: "",
    password: "",
    image: "",
    age: "",
    adharNumber: "",
    location: "",
    role: "GYM_TRAINER",
    gymID: "1",
    speciality: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        ...user,
        password: "", // Reset for security
      }));
    }
  }, [user]);

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        try {
          const imageUrl = await uploadToCloudinary(file);
          setFormData((prev) => ({
            ...prev,
            image: imageUrl,
          }));
        } catch (err) {
          console.error("Image upload failed:", err);
          setError("Image upload failed.");
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (!formData[key] && key !== "role") {
        setError("All fields are required.");
        return;
      }
    }

    setIsSubmitting(true);
    setError("");

    try {
      console.log("Edit Trainer Profile Data:", formData);
      await dispatch(editTrainerProfile(formData, token));
      navigate(-1);
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url('/h.jpg')` }} />
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-md text-white p-10 rounded-3xl shadow-xl border border-white/20">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 text-white hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-4xl font-bold mb-10 text-center">Edit Profile – Trainer</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Trainer ID", name: "id" },
            { label: "Full Name", name: "name" },
            { label: "Gender", name: "gender" },
            { label: "Occupation", name: "occupation" },
            { label: "Username", name: "username" },
            { label: "Password", name: "password", type: "password" },
            { label: "Age", name: "age" },
            { label: "Aadhar Number", name: "adharNumber" },
            { label: "Location", name: "location" },
            { label: "Speciality", name: "speciality" },
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

          {/* Image Upload */}
          <div className="flex flex-col col-span-2">
            <label className="mb-1 font-semibold">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30 file:bg-red-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer"
            />
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className="col-span-2 flex justify-center">
              <img src={formData.image} alt="Preview" className="w-24 h-24 rounded-full border mt-2" />
            </div>
          )}

          {/* Role (disabled) */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Role</label>
            <input
              value="GYM_TRAINER"
              disabled
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white cursor-not-allowed border border-white/30"
            />
          </div>

          {/* Gym ID (disabled) */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Gym ID</label>
            <input
              value={formData.gymID}
              disabled
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white cursor-not-allowed border border-white/30"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="col-span-2 text-red-400 text-sm mt-2">{error}</div>
          )}

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTrainerProfile;
