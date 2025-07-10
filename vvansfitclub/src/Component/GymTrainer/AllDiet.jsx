import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Utensils } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { allDiet, deleteDiet } from "../../Redux/GymTrainer/Action";


const DietList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const token=localStorage.getItem("token");
  const dispatch=useDispatch();

  const diet=useSelector((store) => store.trainer.AllDiet);

  useEffect(() => {
    dispatch(allDiet(token));
  } ,[dispatch, token])

  const filteredDiets = diet?.filter(
    (diet) =>
      diet.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      diet.goal?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const handledelete=(id) => {
    dispatch(deleteDiet(id,token));
    dispatch(allDiet(token));
  }

  return (
    <div className="relative min-h-screen text-white px-6 py-10">
      {/* Background image and overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/f.jpg')` }}
      />
      <div className="absolute inset-0 bg-black/80 z-0" />

      {/* Foreground content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">All Diet Plans</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or goal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-8 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Diet Cards */}
        <div className="grid gap-6">
          {filteredDiets?.map((diet) => (
            <div
              key={diet.id}
              className="bg-white/10 rounded-xl overflow-hidden border border-white/20 shadow-lg"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-900 via-gray-700 to-black px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <Utensils className="w-5 h-5" />
                  {diet.name}
                </h2>
                <div className="flex gap-3">
                  {/* <button
                    onClick={() => console.log("Edit diet", diet.id)}
                    className="hover:text-yellow-400 transition"
                  >
                    <Pencil className="w-5 h-5" />
                  </button> */}
                  <button
                    onClick={() => handledelete(diet.id)}
                    className="hover:text-red-500 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* ID & Goal */}
              <div className="px-6 pt-3 text-sm text-gray-300 flex justify-between">
                <span>
                  ID: <span className="font-mono">{diet.id}</span>
                </span>
                <span className="italic">Goal: {diet.goal}</span>
              </div>

              {/* Meals */}
              <div className="px-6 py-4 space-y-2">
                {diet.meal?.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-gray-200 bg-white/5 p-2 rounded-md"
                  >
                    <span className="font-medium">{m.category}</span>
                    <span className="text-right">{m.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* No Results */}
          {filteredDiets?.length === 0 && (
            <p className="text-center text-gray-400">No diet plans found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietList;
