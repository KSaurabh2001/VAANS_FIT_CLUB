import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userById, userPlan, userSession, userTrainer } from "../../Redux/GymUser/Action";
import { CheckCircle } from "lucide-react";

const UserProfileforOther = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const gymuser = useSelector((store) => store.gymUser.UserById);
  const bookedClass = useSelector((store) => store.gymUser.bookedClass);
  const trainer = useSelector((store) => store.gymUser.trainer);
  const plan=useSelector((store) => store.gymUser.membership);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const initial = gymuser?.username?.charAt(0)?.toUpperCase() || "?";

  useEffect(() => {
    dispatch(userById(id, token));
  }, [id, dispatch, token]);

  useEffect(() => {
    dispatch(userSession(id, token));
    dispatch(userTrainer(id, token));
    dispatch(userPlan(id,token));
  }, [id, dispatch, token]);


  const gradient = {
    "Basic": "bg-gradient-to-br from-gray-800 to-gray-900",
    "Premium+": "bg-gradient-to-br from-red-800 to-orange-700",
    "Elite": "bg-gradient-to-br from-orange-800 to-yellow-600",
    "Pro": "bg-gradient-to-br from-red-900 to-yellow-600"

  }

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url('/h.jpg')` }}
    >
      <div className="bg-black/40 w-full backdrop-blur-md rounded-2xl p-10 space-y-16">
        {/* User Info */}

       <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
  {/* X Button aligned top-right */}
  <button
    onClick={() => navigate(-1)}
    className="absolute top-0 right-0 m-2 rounded-full bg-white/20 hover:bg-red-600 hover:text-white text-white p-2 shadow-lg transition-all duration-200 z-10"
  >
    <X className="w-5 h-5" />
  </button>

  {/* User Info Card */}
  <div className="bg-white/10 rounded-3xl shadow-lg border border-white/20 p-8 h-full flex flex-col justify-between">
    <div className="flex items-center gap-6">
      {gymuser?.image ? (
        <img
          src={gymuser?.image}
          alt={gymuser?.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-white"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold border border-white/30">
          {initial}
        </div>
      )}

      <div className="space-y-1">
        <h2 className="text-3xl font-bold">{gymuser?.name}</h2>
        <p className="text-gray-400 text-sm italic">Gym Member</p>
        <p className="text-xs text-gray-400">Role: {gymuser?.role}</p>
      </div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 text-sm text-gray-300">
      <p>ID: <span className="text-white">{gymuser?.id}</span></p>
      <p>Username: <span className="text-white">{gymuser?.username}</span></p>
      <p>Gender: <span className="text-white">{gymuser?.gender}</span></p>
      <p>Age: <span className="text-white">{gymuser?.age}</span></p>
      <p>Location: <span className="text-white">{gymuser?.location}</span></p>
      <p>Aadhar Number: <span className="text-white">{gymuser?.adharNumber}</span></p>
    </div>
  </div>

  {/* Assigned Trainer Card */}
  <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg h-full flex flex-col justify-between">
    <div>
      <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
        🏋️ Assigned Trainer
      </h3>
      <div className="h-[1px] bg-white/20 mb-4" />
      <div className="flex items-center gap-6">
        <img
          src={trainer?.image}
          alt={trainer?.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-white"
        />
        <div className="space-y-1">
          <h4 className="text-lg font-semibold">{trainer?.name}</h4>
          <p className="text-sm text-gray-300">Username: {trainer?.username}</p>
          <p className="text-sm text-gray-300">Speciality: {trainer?.speciality}</p>
          <p className="text-sm text-gray-300">Location: {trainer?.location}</p>
        </div>
      </div>
    </div>
  </div>

  {/* Membership Card */}
  <div
    className={`rounded-xl p-6 text-white shadow-lg border h-full flex flex-col justify-between hover:bg-red-700 hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out ${
      plan?.name
        ? gradient[plan.name]
        : "bg-gradient-to-br from-gray-800 to-gray-900"
    }`}
  >
    <h3 className="text-xl font-bold mb-4 text-center">💳 Membership Plan</h3>
    {plan?.name ? (
      <>
        <div className="text-center mb-4">
          <span className="block text-2xl font-bold">{plan.name}</span>
        </div>
        <ul className="space-y-3 text-sm">
          {plan.features?.map((feature, i) => (
            <li key={i} className="flex items-center text-gray-200">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </>
    ) : (
      <p className="text-center text-yellow-400 font-semibold">
        ⚠️ No plan selected. Please contact your gym handler to subscribe.
      </p>
    )}
  </div>
</div>


        {/* Booked Classes */}
        <div>
          <div className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 via-gray-700 to-black shadow-md mb-6">
            <h3 className="text-2xl font-bold text-white">📅 Booked Classes</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {bookedClass?.map((s) => (
              <div
                key={s.id}
                className="bg-white/10 border border-white/20 rounded-xl overflow-hidden transition hover:-translate-y-1 hover:bg-white/20"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5 space-y-1">
                  <h4 className="text-lg font-bold">{s.name}</h4>
                  <p className="text-sm text-gray-300">{s.timing}</p>
                  <p className="text-sm text-gray-400">{s.description}</p>
                  <p className="text-xs text-gray-500 italic">ID: {s.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Diet */}
        <div>
          <div className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 via-gray-700 to-black shadow-md mb-6">
            <h3 className="text-2xl font-bold text-white">🥗 Diet Plan</h3>
            <p className="text-gray-300 mt-1">
              <span className="font-semibold">Goal:</span> {gymuser?.diet?.goal}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Plan Name:</span> {gymuser?.diet?.name}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gymuser?.diet?.meal?.map((meal) => (
              <div
                key={meal.id}
                className="bg-white/10 border border-white/20 rounded-xl p-5 hover:bg-white/20 transition duration-300 shadow-lg"
              >
                <h4 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-3">
                  🍽️ {meal.category}
                </h4>
                <p className="text-sm text-gray-300">{meal.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* User Workout */}
        <div>
          <div className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 via-gray-700 to-black shadow-md mb-6">
            <h3 className="text-2xl font-bold text-white">💪 Workout Plan</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {gymuser?.workout?.map((w) => (
              <div
                key={w.id}
                className="bg-white/10 border border-white/20 rounded-xl p-5 space-y-3 shadow-md hover:bg-white/20 transition duration-300"
              >
                <h4 className="text-xl font-semibold text-white border-b border-white/30 pb-2">
                  🏋️ Muscle Group: {w.muscleGroup}
                </h4>

                <ul className="text-sm text-gray-300 space-y-2">
                  {w.exercise?.map((ex, index) => (
                    <li
                      key={index}
                      className="border border-white/10 p-2 rounded-lg bg-white/5"
                    >
                      <p className="font-semibold text-white">{index + 1}. {ex.name}</p>
                      <p className="text-gray-400">Reps: {ex.reps}</p>
                      <p className="text-gray-400">Sets: {ex.sets}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileforOther;
