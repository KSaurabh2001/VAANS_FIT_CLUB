import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWorkout, editWorkout, getWorkoutById } from "../../Redux/GymTrainer/Action";
import { X } from "lucide-react";

const EditWorkoutForm = () => {
  const { workoutId } = useParams(); // optional param
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const workoutToEdit = useSelector((state) => state.gymTrainer.workoutToEdit);

  const [formData, setFormData] = useState({
    muscleGroup: "",
    exercise: [{ name: "", reps: "", sets: "" }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch workout if editing
  useEffect(() => {
    if (workoutId) {
      dispatch(getWorkoutById(workoutId));
    }
  }, [dispatch, workoutId]);

  // Populate form when workout is fetched
  useEffect(() => {
    if (workoutId && workoutToEdit) {
      setFormData({
        muscleGroup: workoutToEdit.muscleGroup || "",
        exercise: workoutToEdit.exercise?.length
          ? workoutToEdit.exercise
          : [{ name: "", reps: "", sets: "" }],
      });
    }
  }, [workoutToEdit, workoutId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      muscleGroup: e.target.value,
    }));
  };

  const handleExerciseChange = (index, field, value) => {
    const updated = [...formData.exercise];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      exercise: updated,
    }));
  };

  const addExerciseField = () => {
    setFormData((prev) => ({
      ...prev,
      exercise: [...prev.exercise, { name: "", reps: "", sets: "" }],
    }));
  };

  const removeExerciseField = (index) => {
    const updated = formData.exercise.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      exercise: updated,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.muscleGroup.trim()) {
      setError("Muscle group is required");
      return;
    }

    const incomplete = formData.exercise.some(
      (ex) => !ex.name.trim() || !ex.reps.trim() || !ex.sets.trim()
    );

    if (incomplete) {
      setError("Please complete all exercise fields or remove empty ones.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      if (workoutId) {
        await dispatch(editWorkout(formData, token, workoutId));
      } else {
        await dispatch(addWorkout(formData, token));
      }
      navigate(-1);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/h.jpg')` }}
      />
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-md text-white p-8 rounded-2xl shadow-xl border border-white/20">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">
          {workoutId ? "Edit Workout Plan" : "Add Workout Plan"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Muscle Group</label>
            <input
              type="text"
              value={formData.muscleGroup}
              onChange={handleChange}
              placeholder="e.g. Chest, Legs"
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Exercises</label>
            {formData.exercise.map((ex, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mb-2 items-center">
                <input
                  type="text"
                  value={ex.name}
                  onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                  placeholder="Name"
                  className="px-3 py-2 rounded bg-white/10 border border-white/30 text-white placeholder-gray-300"
                />
                <input
                  type="text"
                  value={ex.reps}
                  onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
                  placeholder="Reps"
                  className="px-3 py-2 rounded bg-white/10 border border-white/30 text-white placeholder-gray-300"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={ex.sets}
                    onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
                    placeholder="Sets"
                    className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/30 text-white placeholder-gray-300"
                  />
                  {formData.exercise.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExerciseField(index)}
                      className="text-red-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addExerciseField}
              className="mt-1 text-sm text-blue-400 hover:underline"
            >
              + Add Exercise
            </button>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition"
          >
            {isSubmitting
              ? workoutId
                ? "Updating..."
                : "Adding..."
              : workoutId
              ? "Update Workout"
              : "Add Workout"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditWorkoutForm;
