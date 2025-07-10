import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import uploadToCloudinary from "../../Config/UploadToCloud";
import { useDispatch } from "react-redux";
import { addTrainer, addUser } from "../../Redux/GymOwner/Action";

const AddUserOrTrainerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    occupation: "",
    username: "",
    password: "",
    image: "",
    age: "",
    adharNumber: "",
    location: "",
    role: "GYM_USER",
    gymID: "",
    speciality: "",
    paymentStatus: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "gender",
      "occupation",
      "username",
      "password",
      "age",
      "adharNumber",
      "location",
      "role",
      "gymID",
      formData.role === "GYM_USER" ? "paymentStatus" : "speciality",
    ];

    for (const key of requiredFields) {
      if (!formData[key]) {
        setError("All fields are required");
        return;
      }
    }

    if (!selectedFile) {
      setError("Please choose a profile image");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const imageUrl = await uploadToCloudinary(selectedFile);
      if (!imageUrl) throw new Error("Image upload failed");

      const finalData = { ...formData, image: imageUrl };
      console.log("Submitted Data:", finalData);

      if (formData.role === "GYM_TRAINER") {
        dispatch(addTrainer(finalData, token));
      } else {
        dispatch(addUser(finalData, token));
      }

      navigate(-1);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/h.jpg')` }}
      ></div>
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-md text-white p-10 rounded-3xl shadow-xl border border-white/20">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 text-white hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-4xl font-bold mb-10 text-center">
          Add {formData.role === "GYM_TRAINER" ? "Trainer" : "User"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["name", "gender", "occupation", "username", "password", "age", "adharNumber", "location", "gymID"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="mb-1 font-semibold">{field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}</label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder={field.replace(/([A-Z])/g, " $1")}
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-white"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="GYM_USER">GYM_USER</option>
              <option value="GYM_TRAINER">GYM_TRAINER</option>
            </select>
          </div>

          {formData.role === "GYM_USER" && (
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Payment Status</label>
              <input
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
                placeholder="e.g. Paid or Pending"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          )}

          {formData.role === "GYM_TRAINER" && (
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Speciality</label>
              <input
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
                placeholder="e.g. Cardio, Strength, Yoga"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          )}

          {error && (
            <div className="col-span-2 text-red-400 text-sm mt-2">{error}</div>
          )}

          <div className="col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
            >
              {isSubmitting
                ? `Adding ${formData.role === "GYM_TRAINER" ? "Trainer" : "User"}...`
                : `Add ${formData.role === "GYM_TRAINER" ? "Trainer" : "User"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserOrTrainerForm;
