import { useNavigate } from "react-router-dom";
import { X, Pencil, Eye, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allGyms, deleteGym } from "../../Redux/GymOwner/Action";

const AllGyms = () => {
  const allGym = useSelector((store) => store.owner.AllGym);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(allGyms(token));
      console.log("Fetching gyms with token:", token);
    }
  }, [dispatch, token]);

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredGyms = allGym?.filter((gym) =>
    `${gym.name} ${gym.location} ${gym.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Gym?")) {
      dispatch(deleteGym(id, token));
    }
  };

  const handleEdit = (gym) => {
    navigate(`/home/editgym/${gym.id}`);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center px-4 py-10"
      style={{ backgroundImage: `url('/a.jpg')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 rounded-2xl shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">All Gyms</h2>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, location or email..."
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Gym Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGyms?.length > 0 ? (
            filteredGyms.map((gym) => (
              <div
                key={gym?.id}
                className="bg-white/10 border border-white/20 rounded-xl p-5 hover:bg-white/20 transition shadow relative"
              >
                <h3 className="text-xl font-semibold">{gym?.name}</h3>
                <p className="text-sm text-gray-300">🆔 ID: {gym?.id}</p>
                <p className="text-sm text-gray-300">📍 {gym?.location}</p>
                <p className="text-sm text-gray-300">📞 {gym?.phone}</p>

                {/* Buttons */}
                <div className="mt-4 flex justify-between items-center">
                  <button
                    >
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/home/gym/${gym?.id}`)}
                      className="p-1 rounded-full bg-gray-500 hover:bg-gray-600 transition"
                    >
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                    <button
                      className="text-blue-400 hover:text-blue-600"
                      onClick={() => handleEdit(gym)}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-600"
                      onClick={() => handleDelete(gym?.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">No gyms found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllGyms;
