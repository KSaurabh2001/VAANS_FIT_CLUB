import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Dumbbell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { allWorkout, deleteWorkout } from "../../Redux/GymTrainer/Action";



const WorkoutList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const token=localStorage.getItem("token");
  const dispatch=useDispatch();
  const workout=useSelector((store) => store.trainer.AllWorkout);
 

  useEffect(() => {

    dispatch(allWorkout(token));
  }, [token,dispatch]);

  const filteredWorkouts = workout?.filter((w) =>
    w.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlerDelete=(id) => {
    dispatch(deleteWorkout(id,token));
    dispatch(allWorkout(token));
  }

  return (
    <div className="relative min-h-screen text-white px-6 py-10">
      {/* Background Image + Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/e.jpg')` }}
      />
      <div className="absolute inset-0 bg-black/80 z-0" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">All Workouts</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by muscle group..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-8 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Workout Cards */}
        <div className="grid gap-6">
          {filteredWorkouts?.map((workout) => (
            <div
              key={workout.id}
              className="bg-white/10 rounded-xl overflow-hidden border border-white/20 shadow-lg"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-900 via-gray-700 to-black px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <Dumbbell className="w-5 h-5" />
                  {workout.muscleGroup}
                  <span className="text-sm font-mono text-white/70">(ID: {workout.id})</span>
                </h2>
                <div className="flex gap-3">
                  {/* <button
                    onClick={() => console.log("Edit workout", workout.id)}
                    className="hover:text-yellow-400 transition"
                  >
                    <Pencil className="w-5 h-5" />
                  </button> */}
                  <button
                    onClick={() => handlerDelete(workout.id)}
                    className="hover:text-red-500 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Exercise List */}
              <div className="px-6 py-4 space-y-2">
                {workout.exercise.map((ex, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-gray-200 bg-white/5 p-2 rounded-md"
                  >
                    <span className="font-medium">{ex.name}</span>
                    <span>{ex.reps} reps × {ex.sets} sets</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* No Results */}
          {filteredWorkouts?.length === 0 && (
            <p className="text-center text-gray-400">No workouts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutList;
