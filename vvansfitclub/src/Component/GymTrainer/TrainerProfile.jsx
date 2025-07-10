import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { trainerById } from "../../Redux/GymTrainer/Action";
import { useEffect } from "react";

const dummyTrainer = {
  id: 101,
  name: "Rahul Sharma",
  gender: "Male",
  occupation: "Personal Trainer",
  username: "rahul.fit",
  age: 29,
  adharNumber: "1234-5678-9012",
  location: "Pune",
  gymId: 999,
  speciality: "Strength Training",
  role: "TRAINER",
  image: "", // fallback
};

const dummyUsers = [
  {
    id: 1,
    name: "Saurabh Kumar",
    gender: "Male",
    username: "saurabh.k",
    age: "24",
    location: "Pune",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 2,
    name: "Neha Mehta",
    gender: "Female",
    username: "neha.fit",
    age: "22",
    location: "Delhi",
    image: "", // fallback
  },
];

const dummySessions = [
  {
    id: 1,
    name: "Strength Blast",
    timing: "08:00 AM - 09:00 AM",
    description: "Full body strength training session.",
    image: "/d.jpg",
  },
  {
    id: 2,
    name: "Cardio Burn",
    timing: "06:00 PM - 07:00 PM",
    description: "High-intensity cardio session.",
    image: "/a.jpg",
  },
];

const TrainerProfile = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const  {id} =useParams();
  const token=localStorage.getItem("token");
  const trainer=useSelector((store) => store.trainer.TrainerById);
  console.log("trainer" ,trainer);

  useEffect(() => {

    dispatch(trainerById(id,token));
  } ,[dispatch, token ,id]);

  const t = trainer;
  const initial = t?.username?.charAt(0)?.toUpperCase() || "?";

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url('/h.jpg')` }}
    >
      <div className="bg-black/40 w-full backdrop-blur-md rounded-2xl p-10 space-y-16">
        {/* Trainer Info */}
        <div className="bg-white/10 rounded-3xl shadow-lg border border-white/20 p-8 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 right-5 text-white hover:text-red-500 transition"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-6">
            {t?.image ? (
              <img
                src={t?.image}
                alt={t?.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold border border-white/30">
                {initial}
              </div>
            )}

            <div className="space-y-1">
              <h2 className="text-3xl font-bold">{t?.name}</h2>
              <p className="text-gray-400 text-sm italic">{t?.occupation}</p>
              <p className="text-xs text-gray-400">Role: {t?.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 text-sm text-gray-300">
            <p>
              ID: <span className="text-white">{t?.id}</span>
            </p>
            <p>
              Username: <span className="text-white">{t?.username}</span>
            </p>
            <p>
              Gender: <span className="text-white">{t?.gender}</span>
            </p>
            <p>
              Age: <span className="text-white">{t?.age}</span>
            </p>
            <p>
              Aadhar: <span className="text-white">{t?.adharNumber}</span>
            </p>
            <p>
              Location: <span className="text-white">{t?.location}</span>
            </p>
            <p>
              Gym ID: <span className="text-white">{t?.gymId}</span>
            </p>
            <p>
              Speciality: <span className="text-white">{t?.speciality}</span>
            </p>
          </div>
        </div>

        {/* Assigned Users */}
        <div>
          <div className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 via-gray-700 to-black shadow-md mb-6">
            <h3 className="text-2xl font-bold text-white">👤 Assigned Users</h3>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {t?.user?.map((u) => {
              const userInitial = u.username?.charAt(0)?.toUpperCase() || "?";

              return (
                <div
                  key={u.id}
                  onClick={() => navigate(`/home/userProfileForOthers/${u.id}`)}
                  className="cursor-pointer bg-white/10 border border-white/20 rounded-xl overflow-hidden transition transform hover:-translate-y-1 hover:bg-white/20"
                >
                  {u.image ? (
                    <img
                      src={u.image}
                      alt={u.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white mx-auto mt-4"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold border border-white/30 mx-auto mt-4">
                      {userInitial}

                      {userInitial}
                    </div>
                  )}

                  <div className="p-4 space-y-1">
                    <h4 className="text-lg font-semibold text-white">
                      {u.name}
                    </h4>
                    <p className="text-sm text-gray-300">
                      Username: {u.username}
                    </p>
                    <p className="text-sm text-gray-300">Age: {u.age}</p>
                    <p className="text-sm text-gray-300">Gender: {u.gender}</p>
                    <p className="text-sm text-gray-300">
                      Location: {u.location}
                    </p>
                    <p className="text-xs text-gray-500 italic">ID: {u.id}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assigned Class Sessions */}
        <div>
          <div className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 via-gray-700 to-black shadow-md mb-6">
            <h3 className="text-2xl font-bold text-white">
              📅 Assigned Class Sessions
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {t?.classSession?.map((s) => (
              <div
                key={s.id}
                className="cursor-pointer bg-white/10 border border-white/20 rounded-xl overflow-hidden transition transform hover:-translate-y-1 hover:bg-white/20"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-40 object-cover"
                />

                <div className="p-5 space-y-2">
                  <h4 className="text-lg font-bold text-white">{s.name}</h4>
                  <p className="text-sm text-gray-300">{s.timing}</p>
                  <p className="text-sm text-gray-400">{s.description}</p>
                  <p className="text-xs text-gray-500 italic">
                    Session ID: {s.id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
