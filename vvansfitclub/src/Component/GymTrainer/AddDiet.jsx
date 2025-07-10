import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDiet } from "../../Redux/GymTrainer/Action";

const AddDietForm = () => {
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const dispatch=useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    goal: "",
    meal: [{ category: "", description: "" }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMealChange = (index, field, value) => {
    const updated = [...formData.meal];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      meal: updated,
    }));
  };

  const addMealField = () => {
    setFormData((prev) => ({
      ...prev,
      meal: [...prev.meal, { category: "", description: "" }],
    }));
  };

  const removeMealField = (index) => {
    const updated = formData.meal.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      meal: updated,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.goal.trim()) {
      setError("Name and Goal are required");
      return;
    }

    const incompleteMeal = formData.meal.some(
      (m) => !m.category.trim() || !m.description.trim()
    );

    if (incompleteMeal) {
      setError("Fill all meal fields or remove empty ones.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
     dispatch(addDiet(formData,token));
      navigate(-1);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-black">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/h.jpg')` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Form container */}
      <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-md text-white p-8 rounded-2xl shadow-xl border border-white/20">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">Add Diet Plan</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Diet Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Keto, High-Protein, etc."
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Goal</label>
            <input
              type="text"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="Weight loss, Muscle gain"
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Meals */}
          <div>
            <label className="block mb-2 font-medium">Meals</label>
            {formData.meal.map((m, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-2 items-center">
                <input
                  type="text"
                  value={m.category}
                  onChange={(e) => handleMealChange(index, "category", e.target.value)}
                  placeholder="Category (e.g. Breakfast)"
                  className="px-3 py-2 rounded bg-white/10 border border-white/30 text-white placeholder-gray-300"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={m.description}
                    onChange={(e) => handleMealChange(index, "description", e.target.value)}
                    placeholder="Description (e.g. Oats + Fruits)"
                    className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/30 text-white placeholder-gray-300"
                  />
                  {formData.meal.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMealField(index)}
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
              onClick={addMealField}
              className="mt-1 text-sm text-blue-400 hover:underline"
            >
              + Add Meal
            </button>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition"
          >
            {isSubmitting ? "Adding..." : "Add Diet"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDietForm;
