import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyPayment } from "../../Redux/GymHandler/Action";

const VerifyPayment = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    fullName: "",
    paymentStatus: "",
    plan: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVerify = () => {
    console.log("Verify payment status:", formData);
    dispatch(verifyPayment(formData.userId, formData.paymentStatus, formData.plan, token));
    navigate(-1);
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4 py-10">
      {/* Background image */}
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

        <h2 className="text-3xl font-bold mb-8 text-center">Verify Payment</h2>

        <form className="space-y-6">
          {/* User ID */}
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="User ID"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Username */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />

        {/* Payment Status Dropdown */}
<select
  name="paymentStatus"
  value={formData.paymentStatus}
  onChange={handleChange}
  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
>
  <option className="bg-gray-800 text-white" value="">Payment Status</option>
  <option className="bg-gray-800 text-white" value="Paid">Paid</option>
  <option className="bg-gray-800 text-white" value="Pending">Pending</option>
</select>

{/* Plan Dropdown */}
<select
  name="plan"
  value={formData.plan}
  onChange={handleChange}
  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4"
>
  <option className="bg-gray-800 text-white" value="">Membership Plan</option>
  <option className="bg-gray-800 text-white" value="Basic">Basic</option>
  <option className="bg-gray-800 text-white" value="Pro">Pro</option>
  <option className="bg-gray-800 text-white" value="Elite">Elite</option>
  <option className="bg-gray-800 text-white" value="Premium+">Premium+</option>
</select>

          <button
            type="button"
            onClick={handleVerify}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Verify Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyPayment;
