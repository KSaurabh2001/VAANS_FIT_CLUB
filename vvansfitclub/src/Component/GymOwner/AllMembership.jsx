import { useNavigate } from "react-router-dom";
import { X, BadgeDollarSign, Clock, Dumbbell, Trash2, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allMembership, deleteMembership } from "../../Redux/GymOwner/Action";
import { CheckCircle } from "lucide-react";

const AllMemberships = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const memberships = useSelector((store) => store.owner.AllMembership) || [];
  const gradient = {
    "Basic": "bg-gradient-to-br from-gray-800 to-gray-900",
    "Premium+": "bg-gradient-to-br from-red-800 to-orange-700",
    "Elite": "bg-gradient-to-br from-orange-800 to-yellow-600",
    "Pro": "bg-gradient-to-br from-red-900 to-yellow-600"

  }

  useEffect(() => {
    if (token) {
      dispatch(allMembership(token));
    }
  }, [dispatch, token]);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this membership?")) {
      dispatch(deleteMembership(id, token));
    }
  };

  const handleView=(e,id) => {
  navigate(`/home/membershipPage/${id}`)
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center px-4 py-10"
      style={{ backgroundImage: `url('/e.jpg')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 rounded-2xl shadow-lg">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
          <Dumbbell className="w-6 h-6 text-red-500" />
          All Membership Plans
        </h2>

        {/* Membership Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {memberships?.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 hover:ring-2 hover:ring-orange-400 ${gradient[plan.name] || "bg-gradient-to-br from-gray-800 to-gray-900"
                }`}
            >
              <div className="absolute top-3 right-3 z-10 flex gap-2">
                {/* Eye Button */}
                <button
                  onClick={(e) => handleView(e, plan.id)} 
                  className="p-1 rounded-full bg-blue-500 hover:bg-blue-600 transition"
                >
                  <Eye className="w-4 h-4 text-white" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={(e) => handleDelete(e, plan.id)}
                  className="p-1 rounded-full bg-red-500 hover:bg-red-600 transition"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Title & Price */}
              <div className="text-center mb-6 space-y-2">
                {/* Plan Heading */}
                <h3 className="text-2xl font-extrabold tracking-wide text-white uppercase">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="flex justify-center items-baseline gap-1">
                  <span className="text-xl text-gray-300">₹</span>
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                </div>

                {/* Duration */}
                <p className="text-sm text-gray-400 font-medium tracking-wide">
                  Per {plan.duration || "month"}
                </p>
              </div>


              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-200">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {memberships.map((plan) => (
            <div
              key={plan.id}
              className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 hover:scale-[1.02] transition transform duration-300 shadow-md relative"
            >
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={(e) => handleDelete(e, plan.id)}
                  className="p-1 rounded-full bg-red-500 hover:bg-red-600 transition"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>

              <h3 className="text-2xl font-bold mb-2 text-red-400">{plan.name}</h3>

              <p className="flex items-center gap-2 text-sm text-gray-200 mb-1">
                <BadgeDollarSign className="w-4 h-4 text-green-400" />
                ₹{plan.price}
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-200 mb-4">
                <Clock className="w-4 h-4 text-yellow-300" />
                {plan.duration}
              </p>

              <ul className="text-sm text-gray-100 space-y-1 list-disc pl-5">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default AllMemberships;
