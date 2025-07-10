import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addHandler } from "../../Redux/GymOwner/Action";
import uploadToCloudinary from "../../Config/UploadToCloud";

const AddGymHandlerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    occupation: "",
    username: "",
    password: "",
    image: null, // store File object here
    age: "",
    adharNumber: "",
    location: "",
    role: "GYM_HANDLER",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for required fields except image
    for (const key in formData) {
      if (!formData[key] && key !== "image") {
        setError("All fields are required");
        return;
      }
    }

    if (!formData.image) {
      setError("Please select a profile image");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      console.log("📤 Uploading image to Cloudinary...");
      const imageUrl = await uploadToCloudinary(formData.image);

      if (!imageUrl) {
        throw new Error("Image upload failed");
      }

      const payload = {
        ...formData,
        image: imageUrl,
      };

   
      await dispatch(addHandler(payload, token));
      console.log("✅ Handler added successfully");
      navigate(-1);
    } catch (err) {
      console.error("❌ Error submitting handler:", err);
      setError("Something went wrong while adding handler.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/i.jpg')` }}
      ></div>
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-md text-white p-10 rounded-3xl shadow-xl border border-white/20">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 text-white hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-4xl font-bold mb-10 text-center">Add Gym Handler</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Full Name", name: "name" },
            { label: "Gender", name: "gender" },
            { label: "Occupation", name: "occupation" },
            { label: "Username", name: "username" },
            { label: "Password", name: "password", type: "password" },
            { label: "Age", name: "age" },
            { label: "Aadhar Number", name: "adharNumber" },
            { label: "Location", name: "location" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className="flex flex-col">
              <label className="mb-1 font-semibold">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder={label}
              />
            </div>
          ))}

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/10 text-white border border-white/30"
            />
          </div>

          {/* Role - Fixed */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Role</label>
            <input
              value="GYM_HANDLER"
              disabled
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white cursor-not-allowed border border-white/30"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="col-span-2 text-red-400 text-sm mt-2">{error}</div>
          )}

          {/* Submit */}
          <div className="col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
            >
              {isSubmitting ? "Adding..." : "Add Handler"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGymHandlerForm;
