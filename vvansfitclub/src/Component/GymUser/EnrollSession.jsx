import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allClass } from "../../Redux/GymHandler/Action";
import { enroll, unenroll, userSession } from "../../Redux/GymUser/Action";

const ClassBookingPage = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const classes = useSelector((store) => store.handler.allClasses);
  const user = useSelector((store) => store.auth.user);
  const bookedClass = useSelector((store) => store.gymUser.bookedClass); // Already booked by user

  useEffect(() => {
    dispatch(allClass(token));
     if (user?.id && token) {
    dispatch(userSession(user.id, token));
  }
  }, [user,dispatch, token]);

  // Classes belonging to user's gym
  const gymSessions = classes?.filter(
    (session) => session.gymId === user?.gymId
  ) || [];

  // Class session IDs the user has booked
  const bookedSessionIds = new Set(
    bookedClass?.map((s) => s.id)
  );

  const isBooked = (sessionId) => bookedSessionIds?.has(sessionId);

  const handleBook = (sessionId) => {
    dispatch(enroll(user.id,sessionId,token));
    
    console.log("Book session", sessionId);
  };

  const handleUnbook = (sessionId) => {
   dispatch(unenroll(user.id,sessionId,token));
    console.log("Unbook session", sessionId);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/g.jpg')" }}
    >
      <div className="bg-black/20 min-h-screen w-full px-6 py-10 backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-10 text-center">
          📅 Book or Unbook Your Class Sessions
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gymSessions?.map((session) => {
            const booked = isBooked(session.id);

            return (
              <div
                key={session.id}
                className={`rounded-xl overflow-hidden border ${
                  booked ? "border-green-500" : "border-white/20"
                } bg-white/10 hover:bg-white/20 transition`}
              >
                <img
                  src={session.image}
                  alt={session.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h2 className="text-xl font-bold">{session.name}</h2>
                  <p className="text-sm text-gray-300">{session.timing}</p>
                  <p className="text-sm text-gray-400">{session.description}</p>
                  <p className="text-xs text-gray-500 italic">
                    Session ID: {session.id}
                  </p>
                  <button
                    onClick={() =>
                      booked ? handleUnbook(session.id) : handleBook(session.id)
                    }
                    className={`mt-3 px-4 py-2 rounded text-sm font-medium w-full ${
                      booked
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {booked ? "Unbook" : "Book"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassBookingPage;
