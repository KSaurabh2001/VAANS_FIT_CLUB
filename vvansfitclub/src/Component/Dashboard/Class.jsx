
import { Clock } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { allClass } from "../../Redux/GymHandler/Action";



const Class = () => {
  const classes = useSelector((store) => store.handler.allClasses);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {

    dispatch(allClass(token))
  }, [dispatch, token])
  //   const classes = [
  //   {
  //     name: "HIIT Training",
  //     duration: "45 min",
  //     intensity: "High",
  //     description: "High-intensity interval training for maximum calorie burn",
  //     image:
  //       "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800",
  //     schedule: ["Mon 6:00 AM", "Wed 7:00 PM", "Fri 6:00 AM"],
  //   },
  //   {
  //     name: "Strength Training",
  //     duration: "60 min",
  //     intensity: "Medium",
  //     description: "Build muscle and increase strength with guided workouts",
  //     image:
  //       "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800",
  //     schedule: ["Tue 8:00 AM", "Thu 6:00 PM", "Sat 10:00 AM"],
  //   },
  //   {
  //     name: "Yoga Flow",
  //     duration: "50 min",
  //     intensity: "Low",
  //     description:
  //       "Improve flexibility and mindfulness through flowing movements",
  //     image:
  //       "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800",
  //     schedule: ["Mon 7:00 PM", "Wed 9:00 AM", "Sun 5:00 PM"],
  //   },
  //   {
  //     name: "Boxing Fitness",
  //     duration: "45 min",
  //     intensity: "High",
  //     description: "Combat-inspired workout for strength and cardio",
  //     image:
  //       "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
  //     schedule: ["Tue 7:00 PM", "Thu 8:00 AM", "Sat 11:00 AM"],
  //   },
  // ];
  return (

    <section id="classes" className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-0.5 bg-red-500"></div>
            <span className="text-red-500 font-semibold tracking-wider">
              OUR CLASSES
            </span>
            <div className="w-12 h-0.5 bg-red-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect
            <span className="block text-red-500">Workout</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Choose from our diverse range of fitness classes designed to
            challenge, inspire, and transform your body and mind.
          </p>
        </div>


        <div className="grid grid-cols-3  gap-6">
          {classes?.map((s) => (
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
    </section>
  )
}

export default Class;




        {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {classes?.map((classItem, index) => (
                      <div
                        key={index}
                        className="group bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={classItem.image}
                            alt={classItem.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                classItem.intensity === "High"
                                  ? "bg-red-500"
                                  : classItem.intensity === "Medium"
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                              }`}
                            >
                              {classItem.intensity}
                            </span>
                          </div>
                        </div>
        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-bold">{classItem.name}</h3>
                            <div className="flex items-center text-gray-400 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              {classItem.duration}
                            </div>
                          </div>
        
                          <p className="text-gray-300 mb-4">{classItem.description}</p>
        
                          <div className="space-y-2 mb-4">
                            {classItem.schedule?.map((time, timeIndex) => (
                              <div key={timeIndex} className="text-sm text-gray-400">
                                {time}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div> */}